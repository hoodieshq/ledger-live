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
  return (
    <Box {...boxProps}>
      <Alert type="hint">
        <Box flexDirection="column">
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
            <LabelInfoTooltip text={<Trans i18nKey="solana.token.permanentDelegate.tooltipHint" />}>
              <Text>
                <Trans i18nKey="solana.token.permanentDelegate.notice" />
              </Text>
            </LabelInfoTooltip>
          )}
          {!!extensions.transferFeeBps && (
            <LabelInfoTooltip text={<Trans i18nKey="solana.token.transferFees.tooltipHint" />}>
              <Text>
                <Trans
                  i18nKey="solana.token.transferFees.notice"
                  values={{ fee: BigNumber(extensions.transferFeeBps).div(100).toNumber() }}
                />
              </Text>
            </LabelInfoTooltip>
          )}
        </Box>
      </Alert>
    </Box>
  );
}
