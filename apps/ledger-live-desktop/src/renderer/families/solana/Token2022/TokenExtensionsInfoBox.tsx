import React from "react";
import { Trans } from "react-i18next";
import { SpaceProps } from "styled-system";
import BigNumber from "bignumber.js";

import { SolanaTokenAccountExtensions } from "@ledgerhq/live-common/families/solana/types";
import Box from "~/renderer/components/Box";
import Alert from "~/renderer/components/Alert";
import Text from "~/renderer/components/Text";
import LabelInfoTooltip from "~/renderer/components/LabelInfoTooltip";

type Props = SpaceProps & {
  extensions: SolanaTokenAccountExtensions;
};

export default function TokenExtensionsInfoBox({ extensions, ...boxProps }: Props) {
  const extensionsSize = Object.values(extensions);
  if (!extensionsSize.length) return null;

  return (
    <Box {...boxProps}>
      <Alert type="hint">
        <Box flexDirection="column">
          {!!extensions.interestRate && (
            <Text>
              <Trans
                i18nKey="solana.token.interestRate.notice"
                values={{ rate: BigNumber(extensions.interestRate.rateBps).div(100).toNumber() }}
              />
            </Text>
          )}
          {!!extensions.nonTransferable && (
            <Text>
              <Trans i18nKey="solana.token.nonTransferable.notice" />
            </Text>
          )}
          {!!extensions.permanentDelegate && (
            <LabelInfoTooltip
              text={
                <Trans
                  i18nKey="solana.token.permanentDelegate.tooltipHint"
                  values={{ delegateAddress: extensions.permanentDelegate.delegateAddress }}
                />
              }
            >
              <Text>
                <Trans i18nKey="solana.token.permanentDelegate.notice" />
              </Text>
            </LabelInfoTooltip>
          )}
          {!!extensions.transferFee && (
            <LabelInfoTooltip text={<Trans i18nKey="solana.token.transferFees.tooltipHint" />}>
              <Text>
                <Trans
                  i18nKey="solana.token.transferFees.notice"
                  values={{ fee: BigNumber(extensions.transferFee.feeBps).div(100).toNumber() }}
                />
              </Text>
            </LabelInfoTooltip>
          )}
          {!!extensions.requiredMemoOnTransfer && (
            <LabelInfoTooltip
              text={<Trans i18nKey="solana.token.requiredMemoOnTransfer.tooltipHint" />}
            >
              <Text>
                <Trans i18nKey="solana.token.requiredMemoOnTransfer.notice" />
              </Text>
            </LabelInfoTooltip>
          )}
          {!!extensions.transferHook && (
            <LabelInfoTooltip
              text={
                <Trans
                  i18nKey="solana.token.transferHook.tooltipHint"
                  values={{ programAddress: extensions.transferHook.programAddress }}
                />
              }
            >
              <Text>
                <Trans i18nKey="solana.token.transferHook.notice" />
              </Text>
            </LabelInfoTooltip>
          )}
        </Box>
      </Alert>
    </Box>
  );
}
