import BigNumber from "bignumber.js";
import {
  encodeAccountId,
  encodeTokenAccountId,
  emptyHistoryCache,
} from "@ledgerhq/coin-framework/account/index";
import {
  makeSync,
  mergeOps,
  type GetAccountShape,
} from "@ledgerhq/coin-framework/bridge/jsHelpers";
import { getTokenById, listTokensForCryptoCurrency } from "@ledgerhq/cryptoassets/tokens";
import { getAccountBalances, getOperations } from "../network";
import { DEFAULT_COIN_TYPE } from "../network/sdk";
import { SuiOperationExtra, SuiAccount } from "../types";
import type { Operation, SyncConfig, TokenAccount } from "@ledgerhq/types-live";
import { CryptoCurrency } from "@ledgerhq/types-cryptoassets";
import { OperationType } from "@ledgerhq/types-live";
import { promiseAllBatched } from "@ledgerhq/live-promise";

/**
 * Get the shape of the account including its operations and balance.
 * @function getAccountShape
 * @param {Object} info - The information needed to retrieve the account shape.
 * @param {string} info.address - The address of the account.
 * @param {SuiAccount} info.initialAccount - The initial account data.
 * @param {Object} info.currency - The currency information.
 * @param {string} info.derivationMode - The derivation mode for the account.
 * @returns {Promise<Object>} A promise that resolves to the account shape including balance and operations.
 */
export const getAccountShape: GetAccountShape<SuiAccount> = async (info, syncConfig) => {
  const { address, initialAccount, currency, derivationMode } = info;

  const oldOperations = initialAccount?.operations || [];
  const accountId = encodeAccountId({
    type: "js",
    version: "2",
    currencyId: currency.id,
    xpubOrAddress: address,
    derivationMode,
  });

  // Merge new operations with the previously synced ones
  let operations: Operation[] = [];
  try {
    // Needed for incremental synchronisation
    const startAtIn = latestHash(oldOperations, "IN");
    const startAtOut = latestHash(oldOperations, "OUT");
    const newOperations = await getOperations(accountId, address, startAtIn, startAtOut);
    operations = mergeOps(oldOperations, newOperations);
  } catch (e) {
    // if we could NOT sync with existing transaction - we start from the beggining, rewritting transaction history
    operations = await getOperations(accountId, address);
  }

  operations.sort((a, b) => b.date.valueOf() - a.date.valueOf());
  const mainAccountOperations = operations.filter(
    ({ extra }) => (extra as SuiOperationExtra).coinType === DEFAULT_COIN_TYPE,
  );

  const accountBalances = await getAccountBalances(address);
  const balance =
    accountBalances.find(({ coinType }) => coinType === DEFAULT_COIN_TYPE)?.balance ?? BigNumber(0);
  const subAccounts =
    (await buildSubAccounts({
      currency,
      accountId,
      accountBalances: accountBalances.filter(({ coinType }) => coinType != DEFAULT_COIN_TYPE),
      initialAccount,
      initialAccountAddress: address,
      operations,
      syncConfig,
    })) || [];

  return {
    id: accountId,
    balance,
    spendableBalance: balance,
    operationsCount: mainAccountOperations.length,
    blockHeight: 5,
    subAccounts,
    suiResources: {},
    operations: mainAccountOperations,
  };
};

/**
 * Synchronise the account with the latest operations and balance.
 * @function sync
 * @param {Object} params - The parameters for synchronisation.
 * @returns {Promise<void>} A promise that resolves when synchronisation is complete.
 */
export const sync = makeSync({ getAccountShape });

function buildSubAccount({
  accountId,
  parentAccountId,
  initialTokenAccount,
  accountBalance,
  operations,
}: {
  accountId: string;
  parentAccountId: string;
  initialTokenAccount: TokenAccount;
  accountBalance: {
    coinType: string;
    blockHeight: number;
    balance: BigNumber;
  };
  operations: Operation[];
}) {
  const token = getTokenById(accountBalance.coinType);
  const tokenBalance = BigNumber(accountBalance.balance);

  const oldOperations = initialTokenAccount?.operations || [];
  const newOperations = operations
    .filter(({ extra }) => (extra as SuiOperationExtra).coinType === token.id)
    .map(op => ({ ...op, accountId: encodeTokenAccountId(accountId, token) }));

  const tokenOperations = mergeOps(oldOperations, newOperations);

  return {
    type: "TokenAccount" as const,
    id: encodeTokenAccountId(accountId, token),
    parentId: parentAccountId,
    token,
    balance: tokenBalance,
    spendableBalance: tokenBalance,
    operationsCount: tokenOperations.length,
    operations,
    creationDate:
      tokenOperations.length > 0 ? tokenOperations[tokenOperations.length - 1].date : new Date(),
    blockHeight: 5,
    pendingOperations: initialTokenAccount?.pendingOperations || [],
    balanceHistoryCache: initialTokenAccount?.balanceHistoryCache || emptyHistoryCache,
    swapHistory: [],
  };
}

async function buildSubAccounts({
  initialAccount,

  accountId,
  accountBalances,
  currency,
  operations,
  syncConfig,
}: {
  accountId: string;
  accountBalances: {
    coinType: string;
    blockHeight: number;
    balance: BigNumber;
  }[];
  currency: CryptoCurrency;
  operations: Operation[];
  initialAccount?: SuiAccount | null | undefined;
  syncConfig: SyncConfig;
}) {
  const { blacklistedTokenIds = [] } = syncConfig;
  if (listTokensForCryptoCurrency(currency).length === 0) return undefined;
  const tokenAccounts: TokenAccount[] = [];
  const existingAccountByTicker: { [ticker: string]: TokenAccount } = {}; // used for fast lookup
  const existingAccountTickers: string[] = []; // used to keep track of ordering

  if (initialAccount && initialAccount.subAccounts) {
    for (const existingSubAccount of initialAccount.subAccounts) {
      if (existingSubAccount.type === "TokenAccount") {
        const { ticker, id } = existingSubAccount.token;

        if (!blacklistedTokenIds.includes(id)) {
          existingAccountTickers.push(ticker);
          existingAccountByTicker[ticker] = existingSubAccount;
        }
      }
    }
  }

  // filter by token existence
  await promiseAllBatched(3, accountBalances, async accountBalance => {
    const token = getTokenById(accountBalance.coinType);

    if (token && !blacklistedTokenIds.includes(token.id)) {
      const initialTokenAccount = existingAccountByTicker[token.ticker];
      const tokenAccount = await buildSubAccount({
        accountId,
        parentAccountId: accountId,
        initialTokenAccount,
        operations,
        accountBalance,
      });
      if (tokenAccount) tokenAccounts.push(tokenAccount);
    }
  });
  // Preserve order of tokenAccounts from the existing token accounts
  tokenAccounts.sort((a, b) => {
    const i = existingAccountTickers.indexOf(a.token.ticker);
    const j = existingAccountTickers.indexOf(b.token.ticker);
    if (i === j) return 0;
    if (i < 0) return 1;
    if (j < 0) return -1;
    return i - j;
  });
  return tokenAccounts;
}

function latestHash(operations: Operation[], type: OperationType) {
  return operations.find(el => type === el.type)?.blockHash ?? null;
}
