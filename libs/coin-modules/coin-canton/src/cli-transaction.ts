import invariant from "invariant";

import { Transaction } from "./types";
import type { AccountLike } from "@ledgerhq/types-live";

const options = [
  {
    name: "mode",
    type: String,
    desc: "mode of transaction: send",
  },
];

function inferTransactions(
  transactions: Array<{
    account: AccountLike;
    transaction: Transaction;
  }>,
  opts: Record<string, string>,
): Transaction[] {
  return transactions.flatMap(({ transaction }) => {
    invariant(transaction.family === "canton", "canton family");

    return {
      ...transaction,
      family: "canton" as const,
      mode: opts.mode || "send",
    };
  });
}

export default function makeCliTools() {
  return {
    options,
    inferTransactions,
  };
} 