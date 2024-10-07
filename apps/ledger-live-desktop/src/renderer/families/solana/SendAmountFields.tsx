import React from "react";
import {
  Transaction,
  TransactionStatus,
  SolanaTokenAccount,
} from "@ledgerhq/live-common/families/solana/types";
import { Account } from "@ledgerhq/types-live";
import { findSubAccountById } from "@ledgerhq/live-common/account/index";
import TokenTransferFeesWarning from "./Token2022/TokenTransferFeesWarning";

type Props = {
  account: Account;
  parentAccount: Account | null | undefined;
  updateTransaction: (updater: (t: Transaction) => Transaction) => void;
  onChange: (t: Transaction) => void;
  transaction: Transaction;
  status: TransactionStatus;
  bridgePending?: boolean;
  trackProperties?: Record<string, unknown>;
};

const Root = ({ account, transaction, bridgePending, onChange }: Props) => {
  const tokenAcc = transaction.subAccountId
    ? (findSubAccountById(account, transaction.subAccountId) as SolanaTokenAccount)
    : undefined;

  return (
    <div>
      {!!tokenAcc && (
        <TokenTransferFeesWarning
          account={account}
          tokenAccount={tokenAcc}
          transaction={transaction}
          bridgePending={bridgePending}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default {
  component: Root,
  fields: [],
};
