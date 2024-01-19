import type { CryptoCurrency } from "@ledgerhq/types-cryptoassets";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useObservable } from "../../observable";
import { getCurrentSolanaPreloadData, getSolanaPreloadData } from "./js-preload-data";
import {
  SolanaAccount,
  SolanaPreloadDataV1,
  SolanaStake,
  SolanaStakeWithMeta,
  Transaction,
} from "./types";
import { ValidatorsAppValidator } from "./validator-app";
import { getChainAPI } from "./api/chain";
import { endpointByCurrencyId } from "./utils";
import { TransferFeeConfigExt } from "./api/chain/account/tokenExtensions";
import { calculateToken2022TransferFees } from "./logic";
import { TokenAccount } from "@ledgerhq/types-live";

export function useSolanaPreloadData(
  currency: CryptoCurrency,
): SolanaPreloadDataV1 | undefined | null {
  return useObservable(getSolanaPreloadData(currency), getCurrentSolanaPreloadData(currency));
}

export function useValidators(currency: CryptoCurrency, search?: string): ValidatorsAppValidator[] {
  const data = useSolanaPreloadData(currency);

  return useMemo(() => {
    const validators = data?.validators ?? [];

    if (validators.length === 0 || !search || search === "") {
      return validators;
    }

    const lowercaseSearch = search.toLowerCase();

    const filtered = validators.filter(
      validator =>
        validator.name?.toLowerCase().includes(lowercaseSearch) ||
        validator.voteAccount.toLowerCase().includes(lowercaseSearch),
    );

    const flags = [];
    const output: ValidatorsAppValidator[] = [];
    for (let i = 0; i < filtered.length; i++) {
      if (flags[filtered[i].voteAccount]) continue;
      flags[filtered[i].voteAccount] = true;
      output.push(filtered[i]);
    }
    return output;
  }, [data, search]);
}

export function useSolanaStakesWithMeta(
  currency: CryptoCurrency,
  stakes: SolanaStake[],
): SolanaStakeWithMeta[] {
  const data = useSolanaPreloadData(currency);

  if (data === null || data === undefined) {
    return [];
  }

  const { validators } = data;

  const validatorByVoteAccAddr = new Map(validators.map(v => [v.voteAccount, v]));

  return stakes.map(stake => {
    const voteAccAddr = stake.delegation?.voteAccAddr;
    const validator =
      voteAccAddr === undefined ? undefined : validatorByVoteAccAddr.get(voteAccAddr);

    return {
      stake,
      meta: {
        validator: {
          img: validator?.avatarUrl,
          name: validator?.name,
          url: validator?.wwwUrl,
        },
      },
    };
  });
}

export function useFetchCurrentEpoch(currencyId: string) {
  const fetchCurrentEpoch = useCallback(async () => {
    const api = getChainAPI({ endpoint: endpointByCurrencyId(currencyId) });
    return api.getEpochInfo();
  }, [currencyId]);

  return {
    fetchCurrentEpoch,
  };
}

export function useCalculateToken2022TransferFees(
  transaction: Transaction,
  account: SolanaAccount,
  tokenAcount: TokenAccount,
) {
  const [currentEpoch, setCurrentEpoch] = useState<number>();
  const { fetchCurrentEpoch } = useFetchCurrentEpoch(account.currency.id);

  const transferFeeConfigExt =
    transaction.model.commandDescriptor?.command.kind === "token.transfer"
      ? (transaction.model.commandDescriptor.command.tokenExtensions?.find(
          tokenExt => tokenExt.extension === "transferFeeConfig",
        ) as TransferFeeConfigExt)
      : undefined;

  const hasTransferFeeTokenExt = !!transferFeeConfigExt;

  useEffect(() => {
    if (!hasTransferFeeTokenExt) return;
    const fetchEpoch = async () => {
      const data = await fetchCurrentEpoch();
      setCurrentEpoch(data.epoch);
    };
    fetchEpoch();
  }, [hasTransferFeeTokenExt, fetchCurrentEpoch]);

  const transferAmount = transaction.useAllAmount
    ? tokenAcount.spendableBalance.toNumber()
    : transaction.amount.toNumber();

  const transferFees = useMemo(() => {
    if (!transferFeeConfigExt || !currentEpoch) return undefined;
    return calculateToken2022TransferFees({
      transferAmount: transferAmount,
      transferFeeConfigState: transferFeeConfigExt.state,
      currentEpoch,
    });
  }, [transferFeeConfigExt, currentEpoch, transferAmount]);

  return {
    hasTransferFees: hasTransferFeeTokenExt,
    transferFees,
    transferAmount,
  };
}
