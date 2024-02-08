import type { Account, AccountBridge } from "@ledgerhq/types-live";
import type { SolanaTokenAccount, Transaction } from "./types";
import BigNumber from "bignumber.js";
import { ChainAPI } from "./api";
import { getMaybeTokenMint, getStakeAccountMinimumBalanceForRentExemption } from "./api/chain/web3";
import { getMainAccount } from "../../account";
import { estimateTxFee } from "./tx-fees";
import { calculateToken2022TransferFees } from "./logic";
import { TransferFeeConfigExt } from "./api/chain/account/tokenExtensions";

export const estimateFeeAndSpendable = async (
  api: ChainAPI,
  account: Account,
  transaction?: Transaction | undefined | null,
): Promise<{ fee: number; spendable: BigNumber }> => {
  const txKind = transaction?.model.kind ?? "transfer";
  const txFee = await estimateTxFee(api, account.freshAddress, txKind);

  const spendableBalance = BigNumber.max(account.spendableBalance.minus(txFee), 0);

  switch (txKind) {
    case "token.createATA": {
      const assocAccRentExempt = await api.getAssocTokenAccMinNativeBalance();

      return {
        fee: txFee + assocAccRentExempt,
        spendable: BigNumber.max(spendableBalance.minus(assocAccRentExempt), 0),
      };
    }
    case "stake.createAccount": {
      const stakeAccRentExempt = await getStakeAccountMinimumBalanceForRentExemption(api);
      const unstakeReserve =
        (await estimateTxFee(api, account.freshAddress, "stake.undelegate")) +
        (await estimateTxFee(api, account.freshAddress, "stake.withdraw"));

      return {
        fee: txFee + stakeAccRentExempt,
        spendable: BigNumber.max(
          spendableBalance.minus(stakeAccRentExempt).minus(unstakeReserve),
          0,
        ),
      };
    }

    default: {
      return {
        fee: txFee,
        spendable: spendableBalance,
      };
    }
  }
};

function isTransferTx(tx: Transaction | undefined | null): boolean {
  return !!tx && (tx.model.kind === "token.transfer" || tx.model.kind === "transfer");
}
export async function extimateTokenMaxSpendable(
  api: ChainAPI,
  account: SolanaTokenAccount,
  tx?: Transaction | undefined | null,
) {
  if (isTransferTx(tx) && account.extensions?.transferFee) {
    const mint = await getMaybeTokenMint(account.token.contractAddress, api);
    if (!mint || mint instanceof Error) return account.spendableBalance;
    const transferFeeConfig = mint.info.extensions?.find(
      ext => ext.extension === "transferFeeConfig",
    ) as TransferFeeConfigExt;
    if (!transferFeeConfig) return account.spendableBalance;

    const { epoch } = await api.getEpochInfo();

    const { transferAmountExcludingFee } = calculateToken2022TransferFees({
      transferAmount: account.spendableBalance.toNumber(),
      transferFeeConfigState: transferFeeConfig.state,
      currentEpoch: epoch,
    });
    return BigNumber(transferAmountExcludingFee);
  }

  return account.spendableBalance;
}

const estimateMaxSpendableWithAPI = async (
  {
    account,
    parentAccount,
    transaction,
  }: Parameters<AccountBridge<Transaction>["estimateMaxSpendable"]>[0],
  api: ChainAPI,
): Promise<BigNumber> => {
  const mainAccount = getMainAccount(account, parentAccount);

  switch (account.type) {
    case "Account":
      return (await estimateFeeAndSpendable(api, mainAccount, transaction)).spendable;
    case "TokenAccount":
      return extimateTokenMaxSpendable(api, account, transaction);
  }

  throw new Error("not supported account type");
};

export default estimateMaxSpendableWithAPI;
