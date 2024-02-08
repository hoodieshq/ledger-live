import invariant from "invariant";
import React from "react";
import { SolanaFieldComponentProps } from "./types";
import TransactionConfirmField from "~/renderer/components/TransactionConfirm/TransactionConfirmField";
import FormattedVal from "~/renderer/components/FormattedVal";
import { getAccountUnit } from "@ledgerhq/live-common/account/index";
import { SolanaExtraDeviceFields } from "@ledgerhq/live-common/families/solana/deviceTransactionConfig";

const TokenTranferFeeField = ({ account, transaction, field }: SolanaFieldComponentProps) => {
  invariant(transaction.family === "solana", "expect solana transaction");
  invariant(
    transaction.model.commandDescriptor?.command.kind === "token.transfer",
    "expect token.transfer transaction",
  );
  invariant(
    transaction.model.commandDescriptor.command.extensions?.transferFee !== undefined,
    "expect token.transfer transaction with transfer fee extension",
  );
  return (
    <TransactionConfirmField label={field.label}>
      <FormattedVal
        color={"palette.text.shade80"}
        unit={getAccountUnit(account)}
        val={transaction.model.commandDescriptor.command.extensions.transferFee.transferFee}
        fontSize={3}
        inline
        showCode
        alwaysShowValue
        disableRounding
      />
    </TransactionConfirmField>
  );
};

const fieldComponents: Record<
  SolanaExtraDeviceFields,
  React.ComponentType<SolanaFieldComponentProps>
> = {
  "solana.token.transferFee": TokenTranferFeeField,
};

export default {
  fieldComponents,
};
