import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import {
  Transaction,
  SolanaTokenAccount,
  TokenTransferTransaction,
} from "@ledgerhq/live-common/families/solana/types";
import { Account } from "@ledgerhq/types-live";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";
import Spinner from "~/renderer/components/Spinner";
import Text from "~/renderer/components/Text";
import Alert from "~/renderer/components/Alert";
import { Trans } from "react-i18next";
import { Unit } from "@ledgerhq/types-cryptoassets";
import Switch from "~/renderer/components/Switch";
import Box from "~/renderer/components/Box";

type Props = {
  account: Account;
  tokenAccount: SolanaTokenAccount;
  transaction: Transaction;
  bridgePending?: boolean;
  onChange: (t: Transaction) => void;
};

export default function TokenTransferFeesWarning({
  account,
  transaction,
  bridgePending,
  tokenAccount,
  onChange,
}: Props) {
  const transferFees =
    transaction.model.commandDescriptor?.command.kind === "token.transfer"
      ? transaction.model.commandDescriptor.command.extensions?.transferFee
      : undefined;

  const bridge = getAccountBridge(account);

  useEffect(() => {
    if (!transferFees) return;
    if (
      isIncludeFeesToggleDisabled(
        transaction,
        tokenAccount.spendableBalance.toNumber(),
        transferFees.transferAmountIncludingFee,
      )
    )
      onChange(
        bridge.updateTransaction(transaction, {
          model: {
            ...transaction.model,
            uiState: {
              ...transaction.model.uiState,
              includeTransferFees: false,
            },
          },
        }),
      );
  }, [
    bridge,
    onChange,
    transaction,
    transaction.useAllAmount,
    transferFees,
    tokenAccount.spendableBalance,
  ]);

  if (!transferFees) return null;

  const onIncludeFeesToggle = (includeTransferFees: boolean) => {
    onChange(
      bridge.updateTransaction(transaction, {
        amount: BigNumber(
          includeTransferFees
            ? transferFees.transferAmountIncludingFee
            : transferFees.transferAmountExcludingFee,
        ),
        model: {
          ...transaction.model,
          uiState: {
            ...transaction.model.uiState,
            includeTransferFees,
          },
        },
      }),
    );
  };

  if (!transferFees) return <Spinner size={14} />;

  const transferAmount = transaction.useAllAmount
    ? tokenAccount.spendableBalance.toNumber()
    : transaction.amount.toNumber();

  return (
    <div>
      <TransferFeesAlertMessage
        amount={transferAmount}
        transaction={transaction}
        feePercent={transferFees.feePercent}
        transferAmountExcludingFee={transferFees.transferAmountExcludingFee}
        transferAmountIncludingFee={transferFees.transferAmountIncludingFee}
        maxTransferFee={transferFees.maxTransferFee}
        transferFee={transferFees.transferFee}
        tokenUnit={tokenAccount.token.units[0]}
        pending={!!bridgePending}
        spendableBalance={tokenAccount.spendableBalance.toNumber()}
        onIncludeFeesToggle={onIncludeFeesToggle}
      />
    </div>
  );
}

function isIncludeFeesToggleDisabled(
  transaction: Transaction,
  spendableBalance: number,
  transferAmountIncludingFee: number,
) {
  return transaction.useAllAmount || transferAmountIncludingFee > spendableBalance;
}

function fromTokenMagnitude(value: number, magnitude: number) {
  return BigNumber(value).div(BigNumber(10).pow(magnitude)).toNumber();
}

interface TransferFeesAlertMessageProps {
  amount: number;
  transaction: Transaction;
  feePercent: number;
  transferAmountExcludingFee: number;
  transferAmountIncludingFee: number;
  transferFee: number;
  maxTransferFee: number;
  tokenUnit: Unit;
  pending: boolean;
  spendableBalance: number;
  onIncludeFeesToggle(toggle: boolean): void;
}

function TransferFeesAlertMessage({
  amount,
  transaction,
  feePercent,
  transferAmountExcludingFee,
  transferAmountIncludingFee,
  transferFee,
  maxTransferFee,
  tokenUnit,
  pending,
  onIncludeFeesToggle,
  spendableBalance,
}: TransferFeesAlertMessageProps) {
  const [shouldIncludeFees, setShouldIncludeFees] = useState(false);

  useEffect(() => {
    setShouldIncludeFees(
      !!(transaction.model as TokenTransferTransaction).uiState.includeTransferFees,
    );
  }, [transaction]);

  if (!amount) {
    return (
      <Alert>
        <Trans i18nKey="solana.token.transferFees.feesPercentHint" values={{ feePercent }} />
      </Alert>
    );
  }

  const toggleIncludeFees = (toggle: boolean) => {
    setShouldIncludeFees(toggle);
    onIncludeFeesToggle(toggle);
  };

  return (
    <>
      <Alert
        learnMoreOnRight
        learnMoreIsInternal
        rightContent={
          <Box horizontal alignItems="center">
            <Text
              color="palette.text.shade40"
              ff="Inter|Medium"
              fontSize={13}
              style={{ paddingRight: 5, textDecoration: "none" }}
              onClick={() => toggleIncludeFees(!shouldIncludeFees)}
            >
              <Trans i18nKey="solana.token.transferFees.includeFeesSwitch" />
            </Text>
            {pending ? (
              <Spinner size={12} />
            ) : (
              <Switch
                medium
                disabled={isIncludeFeesToggleDisabled(
                  transaction,
                  spendableBalance,
                  transferAmountIncludingFee,
                )}
                isChecked={shouldIncludeFees}
                onChange={toggleIncludeFees}
              />
            )}
          </Box>
        }
      >
        <Text>
          <Trans i18nKey="solana.token.transferFees.feesPercentHint" values={{ feePercent }} />
          {transferFee === maxTransferFee && (
            <>
              <br />
              <Trans
                i18nKey="solana.token.transferFees.maxFeetHint"
                values={{
                  maxFee: fromTokenMagnitude(maxTransferFee, tokenUnit.magnitude),
                  unit: tokenUnit.code,
                }}
              />
            </>
          )}
        </Text>
        <br />
        <Text>
          <Trans
            i18nKey="solana.token.transferFees.amountExcludingFeesHint"
            values={{
              amountExcludingFees: `~${fromTokenMagnitude(
                transferAmountExcludingFee,
                tokenUnit.magnitude,
              )}`,
              unit: tokenUnit.code,
            }}
          />
        </Text>
      </Alert>
    </>
  );
}
