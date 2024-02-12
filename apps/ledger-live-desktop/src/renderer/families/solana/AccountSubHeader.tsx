import React from "react";
import { Trans } from "react-i18next";
import { SolanaAccount, SolanaTokenAccount } from "@ledgerhq/live-common/families/solana/types";
import { isTokenAccountFrozen } from "@ledgerhq/live-common/families/solana/logic";
import { SubAccount } from "@ledgerhq/types-live";

import Box from "~/renderer/components/Box";
import Alert from "~/renderer/components/Alert";
import AccountSubHeader from "../../components/AccountSubHeader/index";
import TokenExtensionsInfoBox from "./Token2022/TokenExtensionsInfoBox";

type Account = SolanaAccount | SolanaTokenAccount | SubAccount;

type Props = {
  account: Account;
};

export default function SolanaAccountSubHeader({ account }: Props) {
  const tokenExtensions =
    account.type === "TokenAccount" ? (account as SolanaTokenAccount)?.extensions : undefined;
  return (
    <>
      <AccountSubHeader family="Solana" team="Solana Labs"></AccountSubHeader>
      {isTokenAccountFrozen(account) && (
        <Box mb={10}>
          <Alert type="warning">
            <Trans i18nKey="solana.token.frozenStateWarning" />
          </Alert>
        </Box>
      )}
      {!!tokenExtensions && (
        <TokenExtensionsInfoBox
          mb={3}
          tokenAccount={account as SolanaTokenAccount}
          extensions={tokenExtensions}
        />
      )}
    </>
  );
}
