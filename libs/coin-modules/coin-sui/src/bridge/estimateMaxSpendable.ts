import type { AccountBridge } from "@ledgerhq/types-live";
import { getMainAccount } from "@ledgerhq/coin-framework/account/index";
import type { AccountLike, Acc } from "@ledgerhq/types-live";
import type { SuiAccount, Transaction } from "../types";
import getFeesForTransaction from "./getFeesForTransaction";
import createTransaction from "./createTransaction";
import { BigNumber } from "bignumber.js";
import { AnyKindOfDictionary } from "lodash";

/**
 * Returns the maximum possible amount for transaction
 * @typedef {Object} EstimateMaxSpendableParams
 * @property {SuiAccount} account - The account from which to estimate the maximum spendable amount.
 * @property {SuiAccount} [parentAccount] - The parent account, if applicable.
 * @property {Transaction} transaction - The transaction details for which to estimate the maximum spendable amount.
 *
 * @returns {Promise<BigNumber>} The estimated maximum spendable amount.
 */
export const estimateMaxSpendable: AccountBridge<Transaction>["estimateMaxSpendable"] = async ({
  account,
  parentAccount,
  transaction,
}) => {
  try {
    const mainAccount = getMainAccount(account, parentAccount) as SuiAccount;
    console.log(
      "account",
      account,
      "parentAccount",
      parentAccount,
      "transaction",
      transaction,
      "mainAccount",
      mainAccount,
    );

    const estimatedTransaction = {
      ...createTransaction(account),
      ...transaction,
      useAllAmount: true,
    };

    const fees = await getFeesForTransaction({
      account: mainAccount,
      transaction: estimatedTransaction,
    });

    let spendableBalance = account.spendableBalance;
    if (fees && account?.type == "Account") {
      spendableBalance = BigNumber.max(spendableBalance.minus(fees), 0);
    }

    return spendableBalance;
  } catch (e) {
    return new BigNumber(0);
  }
};

export default estimateMaxSpendable;
