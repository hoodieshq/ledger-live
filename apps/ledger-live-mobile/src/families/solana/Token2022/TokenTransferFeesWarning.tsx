import React, { useState } from "react";
import { StyleSheet, View, Switch } from "react-native";
import { Trans } from "react-i18next";
import BigNumber from "bignumber.js";
import { Flex, Text } from "@ledgerhq/native-ui";
import { TokenAccount } from "@ledgerhq/types-live";
import { Transaction } from "@ledgerhq/live-common/generated/types";
import { getAccountBridge } from "@ledgerhq/live-common/bridge/index";
import {
  Transaction as SolanaTransaction,
  SolanaAccount,
} from "@ledgerhq/live-common/families/solana/types";
import { useCalculateToken2022TransferFees } from "@ledgerhq/live-common/families/solana/react";
import CounterValue from "~/components/CounterValue";
import CurrencyUnitValue from "~/components/CurrencyUnitValue";

export default function TokenTransferFeesWarning({
  account,
  tokenAccount,
  transaction,
  setTransaction,
}: {
  account: SolanaAccount;
  tokenAccount: TokenAccount;
  transaction: SolanaTransaction;
  setTransaction: (..._: Array<Transaction>) => void;
}) {
  const [shouldIncludeFees, setShouldIncludeFees] = useState(false);
  const { transferFees, hasTransferFees } = useCalculateToken2022TransferFees(
    transaction,
    account as SolanaAccount,
    tokenAccount,
  );
  if (!hasTransferFees || !transferFees) return null;

  const {
    transferAmountExcludingFee,
    transferAmountIncludingFee,
    transferFee,
    maxTransferFee,
    feePercent,
  } = transferFees;
  const tokenUnit = tokenAccount.token.units[0];

  const toggleIncludeFees = (includeFees: boolean) => {
    const bridge = getAccountBridge(account);
    setTransaction(
      bridge.updateTransaction(transaction, {
        amount: BigNumber(includeFees ? transferAmountIncludingFee : transferAmountExcludingFee),
      }),
    );
    setShouldIncludeFees(includeFees);
  };

  return (
    <View style={{ paddingVertical: 16, width: "100%" }}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Text color="grey" fontSize={14}>
          <Trans i18nKey="solana.token.transferFees.title" />
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.accountContainer}>
            <Text style={styles.valueText}>
              <CurrencyUnitValue unit={tokenUnit} value={transferFee} />
            </Text>
          </View>
          <Text style={styles.smallText} color="grey">
            <CounterValue
              before="≈ "
              value={transferFee}
              currency={tokenAccount.token.parentCurrency}
            />
          </Text>
        </View>
      </Flex>
      <Flex
        flexWrap="wrap"
        rowGap={4}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View style={{ width: "60%" }}>
          <Text fontSize={styles.smallText.fontSize}>
            <Trans
              i18nKey="solana.token.transferFees.feesPercentHint"
              values={{
                feePercent: feePercent,
              }}
            />
          </Text>
          {transferFee === maxTransferFee && (
            <Text fontSize={styles.smallText.fontSize}>
              <Trans
                i18nKey="solana.token.transferFees.maxFeetHint"
                values={{
                  maxFee: fromTokenMagnitude(maxTransferFee, tokenUnit.magnitude),
                  unit: tokenUnit.code,
                }}
              />
            </Text>
          )}
          <Text fontSize={styles.smallText.fontSize}>
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
        </View>
        <View style={styles.availableRight}>
          <Text color="grey" mr={2}>
            <Trans i18nKey="solana.token.transferFees.includeFeesSwitch" />
          </Text>
          <Switch
            value={shouldIncludeFees}
            disabled={
              transaction.useAllAmount ||
              tokenAccount.spendableBalance.lt(transferAmountIncludingFee)
            }
            onValueChange={toggleIncludeFees}
          />
        </View>
      </Flex>
    </View>
  );
}

function fromTokenMagnitude(value: number, magnitude: number) {
  return BigNumber(value).div(BigNumber(10).pow(magnitude)).toNumber();
}

const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    flexDirection: "row",
  },
  smallText: {
    fontSize: 12,
  },
  valueText: {
    fontSize: 16,
  },
  availableRight: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
