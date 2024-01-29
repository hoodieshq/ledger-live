import React from "react";
import { View } from "react-native";
import BigNumber from "bignumber.js";
import { Trans } from "react-i18next";
import { Flex, Text, Alert } from "@ledgerhq/native-ui";
import { SolanaTokenAccountExtensions } from "@ledgerhq/live-common/families/solana/types";
import TooltipLabel from "~/components/TooltipLabel";

export default function TokenExtensionsInfoBox({
  extensions,
}: {
  extensions: SolanaTokenAccountExtensions;
}) {
  const extensionsSize = Object.values(extensions);
  if (!extensionsSize) return null;

  return (
    <View>
      <Alert showIcon={extensionsSize.length === 1} type="info">
        <Flex flexDirection="column" columnGap={4} alignItems="flex-start">
          {!!extensions.interestRateBps && (
            <Text>
              <Trans
                i18nKey="solana.token.interestRate.notice"
                values={{ rate: BigNumber(extensions.interestRateBps).div(100).toNumber() }}
              />
            </Text>
          )}
          {!!extensions.nonTransferable && (
            <Text>
              <Trans i18nKey="solana.token.nonTransferable.notice" />
            </Text>
          )}
          {!!extensions.permanentDelegate && (
            <TooltipLabel
              label={
                <Text>
                  <Trans i18nKey="solana.token.permanentDelegate.notice" />
                </Text>
              }
              tooltip={<Trans i18nKey="solana.token.permanentDelegate.tooltipHint" />}
            />
          )}
          {!!extensions.transferFeeBps && (
            <TooltipLabel
              label={
                <Text>
                  <Trans
                    i18nKey="solana.token.transferFees.notice"
                    values={{ fee: BigNumber(extensions.transferFeeBps).div(100).toNumber() }}
                  />
                </Text>
              }
              tooltip={<Trans i18nKey="solana.token.transferFees.tooltipHint" />}
            />
          )}
          {!!extensions.requiredMemoOnTransfer && (
            <TooltipLabel
              label={
                <Text>
                  <Trans i18nKey="solana.token.requiredMemoOnTransfer.notice" />
                </Text>
              }
              tooltip={<Trans i18nKey="solana.token.requiredMemoOnTransfer.tooltipHint" />}
            />
          )}
        </Flex>
      </Alert>
    </View>
  );
}
