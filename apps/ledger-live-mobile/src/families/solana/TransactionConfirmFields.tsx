import invariant from "invariant";
import React from "react";
import { Linking, View } from "react-native";
import { Trans } from "react-i18next";
import { Link } from "@ledgerhq/native-ui";
import BigNumber from "bignumber.js";
import { useAccountUnit } from "~/hooks/useAccountUnit";
import { DataRowUnitValue } from "~/components/ValidateOnDeviceDataRow";
import { SolanaExtraDeviceTransactionField } from "@ledgerhq/live-common/families/solana/types";
import { DeviceTransactionField } from "@ledgerhq/live-common/transaction/index";
import {
  SolanaAccount,
  SolanaTokenAccount,
  Transaction,
  TransactionStatus,
} from "@ledgerhq/live-common/families/solana/types";
import Alert from "~/components/Alert";
import { urls } from "~/utils/urls";
import LText from "~/components/LText";

type SolanaFieldComponentProps = {
  account: SolanaAccount | SolanaTokenAccount;
  parentAccount: SolanaAccount | undefined | null;
  transaction: Transaction;
  status: TransactionStatus;
  field: DeviceTransactionField;
};

const Warning = ({ transaction }: SolanaFieldComponentProps) => {
  invariant(transaction.family === "solana", "solana transaction");
  if (transaction.model.commandDescriptor?.command.kind === "token.transfer") {
    return (
      <View>
        <Alert type="hint">
          <LText>
            <Trans i18nKey="solana.token.transferWarning">
              <Link onPress={() => Linking.openURL(urls.solana.splTokenInfo)} type="color" />
            </Trans>
          </LText>
        </Alert>
      </View>
    );
  }
  return null;
};

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
  const unit = useAccountUnit(account);
  return (
    <DataRowUnitValue
      label={field.label}
      unit={unit}
      value={BigNumber(
        transaction.model.commandDescriptor.command.extensions.transferFee.transferFee,
      )}
    />
  );
};

const fieldComponents: Record<
  SolanaExtraDeviceTransactionField["type"],
  React.ComponentType<SolanaFieldComponentProps>
> = {
  "solana.token.transferFee": TokenTranferFeeField,
};

export default {
  warning: Warning,
  fieldComponents,
};
