import React from "react";
import { Transaction, SolanaTokenAccount } from "@ledgerhq/live-common/families/solana/types";
import { Account } from "@ledgerhq/types-live";
import Alert from "~/renderer/components/Alert";
import { Trans } from "react-i18next";

type Props = {
  account: Account;
  tokenAccount: SolanaTokenAccount;
  transaction: Transaction;
  bridgePending?: boolean;
  onChange: (t: Transaction) => void;
};

export default function TokenTransferFeesWarning({ transaction, tokenAccount }: Props) {
  const transferFees =
    transaction.model.commandDescriptor?.command.kind === "token.transfer"
      ? transaction.model.commandDescriptor.command.extensions?.transferFee
      : undefined;

  if (!transferFees) return null;

  return (
    <div>
      <Alert>
        <Trans
          i18nKey="solana.token.transferFees.feesPercentHint"
          values={{
            feePercent: transferFees.feePercent,
            feeBps: transferFees.feeBps,
          }}
        />
        <br />
        <Trans
          i18nKey="solana.token.transferFees.maxFeetHint"
          values={{
            maxFee: transferFees.maxTransferFee,
            unit: tokenAccount.token.units[0].code,
          }}
        />
      </Alert>
    </div>
  );
}
