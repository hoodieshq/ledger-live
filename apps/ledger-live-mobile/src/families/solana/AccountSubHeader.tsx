import React from "react";
import { Trans } from "react-i18next";
import { SubAccount } from "@ledgerhq/types-live";
import { Box, Alert, Text } from "@ledgerhq/native-ui";
import { isTokenAccountFrozen } from "@ledgerhq/live-common/families/solana/logic";
import { SolanaAccount, SolanaTokenAccount } from "@ledgerhq/live-common/families/solana/types";
import AccountSubHeader from "~/components/AccountSubHeader";
import TokenExtensionsInfoBox from "./Token2022/TokenExtensionsInfoBox";

type Account = SolanaAccount | SolanaTokenAccount | SubAccount;

type Props = {
  account: Account;
};

function SolanaAccountSubHeader({ account }: Props) {
  const tokenExtensions =
    account.type === "TokenAccount" ? (account as SolanaTokenAccount)?.extensions : undefined;
  return (
    <>
      <AccountSubHeader family="Solana" team="Solana Labs" />
      {isTokenAccountFrozen(account) && (
        <Box mb={6}>
          <Alert type="warning">
            <Text variant="body">
              <Trans i18nKey="solana.token.frozenStateWarning" />
            </Text>
          </Alert>
        </Box>
      )}
      {!!tokenExtensions && <TokenExtensionsInfoBox extensions={tokenExtensions} />}
    </>
  );
}

export default SolanaAccountSubHeader;
