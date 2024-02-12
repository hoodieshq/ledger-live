import React from "react";
import { Trans } from "react-i18next";
import { SpaceProps } from "styled-system";

import { SolanaTokenAccountExtensions } from "@ledgerhq/live-common/families/solana/types";
import Box from "~/renderer/components/Box";
import Alert from "~/renderer/components/Alert";
import Text from "~/renderer/components/Text";
import LabelInfoTooltip from "~/renderer/components/LabelInfoTooltip";
import { bpsToPercent } from "@ledgerhq/live-common/families/solana/logic";

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
                values={{ rate: bpsToPercent(extensions.interestRate.rateBps) }}
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
                extensions.permanentDelegate.delegateAddress && (
                  <Trans
                    i18nKey="solana.token.permanentDelegate.tooltipHint"
                    values={{ delegateAddress: extensions.permanentDelegate.delegateAddress }}
                  />
                )
              }
            >
              <Text>
                {extensions.permanentDelegate.delegateAddress ? (
                  <Trans i18nKey="solana.token.permanentDelegate.notice" />
                ) : (
                  <Trans i18nKey="solana.token.permanentDelegate.initializationNotice" />
                )}
              </Text>
            </LabelInfoTooltip>
          )}
          {!!extensions.transferFee && (
            <LabelInfoTooltip text={<Trans i18nKey="solana.token.transferFees.tooltipHint" />}>
              <Text>
                <Trans
                  i18nKey="solana.token.transferFees.notice"
                  values={{ fee: bpsToPercent(extensions.transferFee.feeBps) }}
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
                extensions.transferHook.programAddress && (
                  <Trans
                    i18nKey="solana.token.transferHook.tooltipHint"
                    values={{ programAddress: extensions.transferHook.programAddress }}
                  />
                )
              }
            >
              <Text>
                {extensions.transferHook.programAddress ? (
                  <Trans i18nKey="solana.token.transferHook.notice" />
                ) : (
                  <Trans i18nKey="solana.token.transferHook.initializationNotice" />
                )}
              </Text>
            </LabelInfoTooltip>
          )}
        </Box>
      </Alert>
    </Box>
  );
}
