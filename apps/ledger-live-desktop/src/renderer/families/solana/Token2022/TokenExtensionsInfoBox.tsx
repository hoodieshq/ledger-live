import React from "react";
import { Trans } from "react-i18next";
import { SpaceProps } from "styled-system";

import {
  SolanaTokenAccount,
  SolanaTokenAccountExtensions,
} from "@ledgerhq/live-common/families/solana/types";
import { bpsToPercent } from "@ledgerhq/live-common/families/solana/logic";
import Box from "~/renderer/components/Box";
import Alert from "~/renderer/components/Alert";
import Text from "~/renderer/components/Text";
import LabelInfoTooltip from "~/renderer/components/LabelInfoTooltip";
import Button from "~/renderer/components/Button";
import TokenExtensionsInfoDrawer from "./TokenExtensionsInfoDrawer";

type Props = SpaceProps & {
  tokenAccount: SolanaTokenAccount;
  extensions: SolanaTokenAccountExtensions;
};

export default function TokenExtensionsInfoBox({ tokenAccount, extensions, ...boxProps }: Props) {
  const extensionsSize = Object.values(extensions);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  if (!extensionsSize.length) return null;

  const onLearnMoreClick = () => {
    openDrawer();
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box {...boxProps}>
      <Alert
        type="hint"
        rightContent={
          <Button small lighterPrimary onClick={onLearnMoreClick}>
            <Trans i18nKey="common.learnMore" />
          </Button>
        }
      >
        <Box flexDirection="column">
          {!!extensions.interestRate && (
            <LabelInfoTooltip text={<Trans i18nKey="solana.token.interestRate.tooltipHint" />}>
              <Text>
                <Trans
                  i18nKey="solana.token.interestRate.notice"
                  values={{ rate: bpsToPercent(extensions.interestRate.rateBps) }}
                />
              </Text>
            </LabelInfoTooltip>
          )}

          {!!extensions.nonTransferable && (
            <Text>
              <Trans i18nKey="solana.token.nonTransferable.notice" />
            </Text>
          )}

          {extensions.permanentDelegate ? (
            extensions.permanentDelegate.delegateAddress ? (
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
            ) : (
              <Text>
                <Trans i18nKey="solana.token.permanentDelegate.initializationNotice" />
              </Text>
            )
          ) : null}

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

          {extensions.transferHook ? (
            extensions.transferHook.programAddress ? (
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
            ) : (
              <Text>
                <Trans i18nKey="solana.token.transferHook.initializationNotice" />
              </Text>
            )
          ) : null}
        </Box>
        <TokenExtensionsInfoDrawer
          extensions={extensions}
          tokenAccount={tokenAccount}
          isOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
        />
      </Alert>
    </Box>
  );
}
