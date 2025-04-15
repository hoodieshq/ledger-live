import { BigNumber } from "bignumber.js";
import { AccountBridge, Account, TokenAccount } from "@ledgerhq/types-live";
import type { Transaction } from "../types";
import { DEFAULT_COIN_TYPE } from "../network/sdk";

/**
 * Create an empty transaction
 *
 * @returns {Transaction}
 */
export const createTransaction: AccountBridge<Transaction>["createTransaction"] = (
  account: Account | TokenAccount,
) => {
  console.log("createTransaction", account);
  const transaction: Transaction = {
    family: "sui" as const,
    mode: account.type === "TokenAccount" ? "token.send" : "send",
    coinType: account.type === "TokenAccount" ? account.token.id : DEFAULT_COIN_TYPE,
    amount: new BigNumber(0),
    recipient: "",
    useAllAmount: false,
    fees: null,
    errors: {},
  };
  return transaction;
};

export default createTransaction;
