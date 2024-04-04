import React from "react";
import { View } from "react-native";
import BigNumber from "bignumber.js";
import { Trans } from "react-i18next";
import { Flex, Text, Alert, Box } from "@ledgerhq/native-ui";
import {
  SolanaTokenAccount,
  SolanaTokenAccountExtensions,
} from "@ledgerhq/live-common/families/solana/types";
import { bpsToPercent } from "@ledgerhq/live-common/families/solana/logic";
import TooltipLabel from "~/components/TooltipLabel";
import TokenExtensionsInfoDrawer from "./TokenExtensionsInfoDrawer";
import { InfoMedium } from "@ledgerhq/native-ui/assets/icons";
import CopyButton from "../shared/CopyButton";
import Button from "~/components/Button";

export default function TokenExtensionsInfoBox({
  tokenAccount,
  extensions,
}: {
  tokenAccount: SolanaTokenAccount;
  extensions: SolanaTokenAccountExtensions;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const extensionsSize = Object.values(extensions);
  if (!extensionsSize.length) return null;

  function openDrawer() {
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  return (
    <View>
      <Alert showIcon={extensionsSize.length === 1} type="info">
        <Flex width="100%" flexDirection="column" columnGap={4} alignItems="flex-start">
          {!!extensions.nonTransferable && (
            <Text>
              <Trans i18nKey="solana.token.nonTransferable.notice" />
            </Text>
          )}

          {!!extensions.interestRate && (
            <TooltipLabel
              label={
                <Text>
                  <Trans
                    i18nKey="solana.token.interestRate.notice"
                    values={{
                      rate: BigNumber(extensions.interestRate.rateBps).div(100).toNumber(),
                    }}
                  />
                </Text>
              }
              tooltip={<Trans i18nKey="solana.token.interestRate.tooltipHint" />}
            />
          )}

          {extensions.permanentDelegate ? (
            extensions.permanentDelegate.delegateAddress ? (
              <TooltipLabel
                label={
                  <Text>
                    <Trans i18nKey="solana.token.permanentDelegate.notice" />
                  </Text>
                }
                tooltip={
                  <Trans
                    i18nKey="solana.token.permanentDelegate.tooltipHint"
                    values={{ delegateAddress: extensions.permanentDelegate.delegateAddress }}
                    components={[
                      <CopyButton
                        key="SolanaCopyDelegateAddress"
                        copyString={extensions.permanentDelegate.delegateAddress}
                      />,
                    ]}
                  />
                }
              />
            ) : (
              <TooltipLabel
                label={
                  <Text>
                    <Trans i18nKey="solana.token.permanentDelegate.initializationNotice" />
                  </Text>
                }
                tooltip={
                  <Trans i18nKey="solana.token.permanentDelegate.initializationNoticeTooltipHint" />
                }
              />
            )
          ) : null}

          {!!extensions.transferFee && (
            <TooltipLabel
              label={
                <Text>
                  <Trans
                    i18nKey="solana.token.transferFees.notice"
                    values={{ fee: bpsToPercent(extensions.transferFee.feeBps) }}
                  />
                </Text>
              }
              tooltip={<Trans i18nKey="solana.token.transferFees.tooltipHint" />}
            />
          )}

          {extensions.transferHook ? (
            extensions.transferHook.programAddress ? (
              <TooltipLabel
                label={
                  <Text>
                    <Trans i18nKey="solana.token.transferHook.notice" />
                  </Text>
                }
                tooltip={
                  <Trans
                    i18nKey="solana.token.transferHook.tooltipHint"
                    values={{ programAddress: extensions.transferHook.programAddress }}
                    components={[
                      <CopyButton
                        key="SolanaCopyHookAddress"
                        copyString={extensions.transferHook.programAddress}
                      />,
                    ]}
                  />
                }
              />
            ) : (
              <Text>
                <Trans i18nKey="solana.token.transferHook.initializationNotice" />
              </Text>
            )
          ) : null}

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
          <Box width="100%" mt={4}>
            {/* <Link type="color" size="medium" Icon={InfoMedium} onPress={openDrawer}>
              <Trans i18nKey="common.moreInfo" />
            </Link> */}
            <Button
              type="color"
              size="small"
              maxWidth={150}
              alignSelf="center"
              outline
              Icon={InfoMedium}
              onPress={openDrawer}
            >
              <Trans i18nKey="common.moreInfo" />
            </Button>
          </Box>
        </Flex>
      </Alert>
      <TokenExtensionsInfoDrawer
        extensions={extensions}
        tokenAccount={tokenAccount}
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
      />
    </View>
  );
}
