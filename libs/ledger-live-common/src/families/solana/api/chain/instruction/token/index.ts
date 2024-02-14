import { ParsedInstruction } from "@solana/web3.js";
import { IX_STRUCTS, IX_TITLES, TokenInstructionType } from "./types";

import { ParsedInfo } from "../../validators";
import { create, Infer } from "superstruct";
import { PARSED_PROGRAMS } from "../../program/constants";

type Program = typeof PARSED_PROGRAMS.SPL_TOKEN | typeof PARSED_PROGRAMS.SPL_TOKEN_2022;
export function parseSplTokenInstruction(ix: ParsedInstruction & { program: Program }) {
  const parsed = create(ix.parsed, ParsedInfo);
  const { type: rawType, info } = parsed;
  const type = create(rawType, TokenInstructionType);
  const title = IX_TITLES[type];
  const struct = IX_STRUCTS[type];

  return {
    type,
    title,
    info: create(info, struct as any),
  } as TokenInstructionDescriptor;
}

export type TokenInstructionDescriptor = {
  [K in TokenInstructionType]: {
    title: (typeof IX_TITLES)[K];
    type: K;
    info: Infer<(typeof IX_STRUCTS)[K]>;
  };
}[TokenInstructionType];
