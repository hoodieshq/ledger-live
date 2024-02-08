import React from "react";
import { Trans } from "react-i18next";
import BigNumber from "bignumber.js";
import {
  Transaction,
  SolanaAccount,
  SolanaTokenAccount,
} from "@ledgerhq/live-common/families/solana/types";
import { SubAccount } from "@ledgerhq/types-live";
import { findSubAccountById, getMainAccount } from "@ledgerhq/live-common/account/index";
import Text from "~/renderer/components/Text";
import Box from "~/renderer/components/Box";
import { getAccountUnit } from "@ledgerhq/live-common/account/index";
import FormattedVal from "~/renderer/components/FormattedVal";
import CounterValue from "~/renderer/components/CounterValue";
import Ellipsis from "~/renderer/components/Ellipsis";

type Account = SolanaAccount | SolanaTokenAccount | SubAccount;

type Props = {
  account: Account;
  parentAccount: SolanaAccount | null | undefined;
  transaction: Transaction;
};

const StepSummaryAdditionalRows = ({ account, parentAccount, transaction }: Props) => {
  const mainAccount = getMainAccount(account, parentAccount);
  const tokenAcc = transaction.subAccountId
    ? (findSubAccountById(mainAccount, transaction.subAccountId) as SolanaTokenAccount)
    : undefined;

  const transferFees =
    transaction.model.commandDescriptor?.command.kind === "token.transfer"
      ? transaction.model.commandDescriptor.command.extensions?.transferFee
      : undefined;

  if (!transferFees || !tokenAcc) return null;

  const unit = getAccountUnit(tokenAcc);
  console.log(transaction);

  return (
    <>
      <Box horizontal justifyContent="space-between" alignItems="center" mt={10} mb={20}>
        <Text ff="Inter|Medium" color="palette.text.shade40" fontSize={4}>
          <Trans i18nKey="solana.token.transferFees.transferFeesLabel" />
        </Text>
        <Box>
          <FormattedVal
            color="palette.text.shade80"
            disableRounding
            unit={unit}
            alwaysShowValue
            val={BigNumber(transferFees.transferFee)}
            fontSize={4}
            inline
            showCode
          />
          <Box textAlign="right">
            <CounterValue
              color="palette.text.shade60"
              fontSize={3}
              currency={tokenAcc.token}
              value={BigNumber(transferFees.transferFee)}
              alwaysShowSign={false}
              alwaysShowValue
            />
          </Box>
        </Box>
      </Box>
      <Box horizontal justifyContent="space-between" alignItems="center">
        <Text ff="Inter|Medium" color="palette.text.shade40" fontSize={4}>
          <Trans i18nKey="solana.token.transferFees.feeWithholdingAddressLabel" />
        </Text>
        <Box style={{ maxWidth: "50%" }}>
          <Ellipsis>
            <Text ff="Inter" color="palette.text.shade80" fontSize={4}>
              {transaction.recipient}
            </Text>
          </Ellipsis>
        </Box>
      </Box>
    </>
  );
};

export default StepSummaryAdditionalRows;
