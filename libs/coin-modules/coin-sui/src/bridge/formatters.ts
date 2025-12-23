import { BigNumber } from "bignumber.js";
import { OperationExtra, OperationExtraRaw } from "@ledgerhq/types-live";
import type { SuiOperationExtra, SuiOperationExtraRaw } from "../types";

export function fromOperationExtraRaw(extraRaw: OperationExtraRaw): SuiOperationExtra {
  const extra: SuiOperationExtra = {};
  if (!extraRaw) return extra;
  const raw = extraRaw as SuiOperationExtraRaw;

  if (raw.coinType) extra.coinType = raw.coinType;
  if (raw.transferAmount) extra.transferAmount = new BigNumber(raw.transferAmount);

  return extra;
}

export function toOperationExtraRaw(extra: OperationExtra): SuiOperationExtraRaw {
  const extraRaw: SuiOperationExtraRaw = {};
  if (!extra) return extraRaw;
  const typed = extra as SuiOperationExtra;

  if (typed.coinType) extraRaw.coinType = typed.coinType;
  if (typed.transferAmount) extraRaw.transferAmount = typed.transferAmount.toString();

  return extraRaw;
}

export default {
  fromOperationExtraRaw,
  toOperationExtraRaw,
};
