import invariant from "invariant";
import React, { useMemo } from "react";
import { SolanaFieldComponentProps, SolanaFamily } from "./types";
import TransactionConfirmField from "~/renderer/components/TransactionConfirm/TransactionConfirmField";
import FormattedVal from "~/renderer/components/FormattedVal";
import { useAccountUnit } from "~/renderer/hooks/useAccountUnit";
import { SolanaExtraDeviceTransactionField } from "@ledgerhq/live-common/families/solana/types";
import { getDeviceTransactionConfig } from "@ledgerhq/live-common/transaction/index";
import Alert from "~/renderer/components/Alert";
import { Trans } from "react-i18next";
import ConfirmTitle from "~/renderer/components/TransactionConfirm/ConfirmTitle";
import LinkWithExternalIcon from "~/renderer/components/LinkWithExternalIcon";
import Box from "~/renderer/components/Box";
import { openURL } from "~/renderer/linking";
import { useLocalizedUrl } from "~/renderer/hooks/useLocalizedUrls";
import { urls } from "~/config/urls";

type TransactionConfirmFields = SolanaFamily["transactionConfirmFields"];
type TitleComponent = NonNullable<NonNullable<TransactionConfirmFields>["title"]>;

const Title: TitleComponent = props => {
  const { transaction, account, parentAccount, status } = props;
  const transferTokenHelpUrl = useLocalizedUrl(urls.solana.splTokenInfo);

  const fields = getDeviceTransactionConfig({
    account,
    parentAccount,
    transaction,
    status,
  });

  const typeTransaction: string | undefined = useMemo(() => {
    const typeField = fields.find(field => field.label && field.label === "Type");

    if (typeField && typeField.type === "text" && typeField.value) {
      return typeField.value;
    }
  }, [fields]);

  if (transaction.model.commandDescriptor?.command.kind === "token.transfer") {
    return (
      <Box
        flexDirection="column"
        alignItems="center"
        gap={4}
        mb={4}
        justifyContent="center"
        className="title-test-transfer"
      >
        <ConfirmTitle title={undefined} typeTransaction={typeTransaction} {...props} />
        <Alert type="warning">
          <Trans i18nKey="solana.token.transferWarning">
            <LinkWithExternalIcon
              color="palette.warning.c60"
              onClick={() => openURL(transferTokenHelpUrl)}
            />
          </Trans>
        </Alert>
      </Box>
    );
  }

  return <ConfirmTitle title={undefined} typeTransaction={typeTransaction} {...props} />;
};

const TokenTransferFeeField = ({ account, transaction, field }: SolanaFieldComponentProps) => {
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
    <TransactionConfirmField label={field.label}>
      <FormattedVal
        color={"palette.text.shade80"}
        unit={unit}
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
  SolanaExtraDeviceTransactionField["type"],
  React.ComponentType<SolanaFieldComponentProps>
> = {
  "solana.token.transferFee": TokenTransferFeeField,
};

const transactionConfirmFields: TransactionConfirmFields = {
  fieldComponents,
  title: Title,
};

export default transactionConfirmFields;
