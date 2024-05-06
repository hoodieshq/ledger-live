import { AccountLike } from "@ledgerhq/types-live";
import { SolanaTokenAccount, SolanaTokenProgram } from "../types";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export function isTokenAccountFrozen(account: AccountLike) {
  return account.type === "TokenAccount" && (account as SolanaTokenAccount)?.state === "frozen";
}

export function getTokenAccountProgramId(program: SolanaTokenProgram): typeof TOKEN_PROGRAM_ID {
  return program === "spl-token-2022" ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
}

export function isTokenProgram(program: string): boolean {
  return program === "spl-token" || program === "spl-token-2022";
}
