import { findSubAccountById } from "@ledgerhq/coin-framework/account/index";
import type { SuiAccount, Transaction } from "../types";
import { DEFAULT_COIN_TYPE } from "../network/sdk";
import { craftTransaction, type CreateExtrinsicArg } from "../logic";

export const extractExtrinsicArg = (
  account: SuiAccount,
  transaction: Transaction,
): CreateExtrinsicArg => {
  let subAccount = null;
  if ("subAccountId" in transaction && transaction.subAccountId) {
    subAccount = findSubAccountById(account, transaction.subAccountId);
  }
  return {
    mode: transaction.mode,
    amount: transaction.amount,
    coinType: subAccount?.token.id || DEFAULT_COIN_TYPE,
    recipient: transaction.recipient,
    useAllAmount: transaction.useAllAmount,
  };
};

/**
 *
 * @param {Account} account
 * @param {Transaction} transaction
 */
export const buildTransaction = async (account: SuiAccount, transaction: Transaction) => {
  return craftTransaction(account.freshAddress, extractExtrinsicArg(account, transaction));
};
