/* eslint-disable @typescript-eslint/no-redeclare */

import {
  enums,
  type,
  Infer,
  number,
  string,
  optional,
  array,
  nullable,
  union,
  assign,
} from "superstruct";
import { PublicKeyFromString } from "../../validators/pubkey";

export type TokenAmountUi = Infer<typeof TokenAmountUi>;
export const TokenAmountUi = type({
  amount: string(),
  decimals: number(),
  uiAmountString: string(),
});

const InitializeMint = type({
  mint: PublicKeyFromString,
  decimals: number(),
  mintAuthority: PublicKeyFromString,
  rentSysvar: PublicKeyFromString,
  freezeAuthority: optional(PublicKeyFromString),
});

const InitializeMint2 = type({
  decimals: number(),
  freezeAuthority: PublicKeyFromString,
  freezeAuthorityOption: optional(number()),
  mint: PublicKeyFromString,
  mintAuthority: PublicKeyFromString,
});

const InitializeAccount = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  owner: PublicKeyFromString,
  rentSysvar: PublicKeyFromString,
});

const InitializeAccount2 = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  owner: PublicKeyFromString,
  rentSysvar: PublicKeyFromString,
});

const InitializeAccount3 = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  owner: PublicKeyFromString,
});

const InitializeMultisig = type({
  multisig: PublicKeyFromString,
  rentSysvar: PublicKeyFromString,
  signers: array(PublicKeyFromString),
  m: number(),
});

export type Transfer = Infer<typeof Transfer>;
export const Transfer = type({
  source: PublicKeyFromString,
  destination: PublicKeyFromString,
  amount: union([string(), number()]),
  authority: optional(PublicKeyFromString),
  multisigAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const Approve = type({
  source: PublicKeyFromString,
  delegate: PublicKeyFromString,
  amount: union([string(), number()]),
  owner: optional(PublicKeyFromString),
  multisigOwner: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const Revoke = type({
  source: PublicKeyFromString,
  owner: optional(PublicKeyFromString),
  multisigOwner: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const AuthorityType = enums(["mintTokens", "freezeAccount", "accountOwner", "closeAccount"]);

const SetAuthority = type({
  mint: optional(PublicKeyFromString),
  account: optional(PublicKeyFromString),
  authorityType: AuthorityType,
  newAuthority: nullable(PublicKeyFromString),
  authority: optional(PublicKeyFromString),
  multisigAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const MintTo = type({
  mint: PublicKeyFromString,
  account: PublicKeyFromString,
  amount: union([string(), number()]),
  mintAuthority: optional(PublicKeyFromString),
  multisigMintAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const Burn = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  amount: union([string(), number()]),
  authority: optional(PublicKeyFromString),
  multisigAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const CloseAccount = type({
  account: PublicKeyFromString,
  destination: PublicKeyFromString,
  owner: optional(PublicKeyFromString),
  multisigOwner: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const FreezeAccount = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  freezeAuthority: optional(PublicKeyFromString),
  multisigFreezeAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const ThawAccount = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  freezeAuthority: optional(PublicKeyFromString),
  multisigFreezeAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

export type TransferChecked = Infer<typeof TransferChecked>;
export const TransferChecked = type({
  source: PublicKeyFromString,
  mint: PublicKeyFromString,
  destination: PublicKeyFromString,
  authority: optional(PublicKeyFromString),
  multisigAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
  tokenAmount: TokenAmountUi,
});

export type TransferCheckedWithFee = Infer<typeof TransferCheckedWithFee>;
export const TransferCheckedWithFee = assign(type({ feeAmount: TokenAmountUi }), TransferChecked);

const ApproveChecked = type({
  source: PublicKeyFromString,
  mint: PublicKeyFromString,
  delegate: PublicKeyFromString,
  owner: optional(PublicKeyFromString),
  multisigOwner: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
  tokenAmount: TokenAmountUi,
});

const MintToChecked = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  mintAuthority: optional(PublicKeyFromString),
  multisigMintAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
  tokenAmount: TokenAmountUi,
});

const BurnChecked = type({
  account: PublicKeyFromString,
  mint: PublicKeyFromString,
  authority: optional(PublicKeyFromString),
  multisigAuthority: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
  tokenAmount: TokenAmountUi,
});

const SyncNative = type({
  account: PublicKeyFromString,
});

const GetAccountDataSize = type({
  extensionTypes: optional(array(string())),
  mint: PublicKeyFromString,
});

const InitializeImmutableOwner = type({
  account: PublicKeyFromString,
});

const AmountToUiAmount = type({
  amount: union([string(), number()]),
  mint: PublicKeyFromString,
});

const UiAmountToAmount = type({
  mint: PublicKeyFromString,
  uiAmount: string(),
});

const InitializeMintCloseAuthority = type({
  mint: PublicKeyFromString,
  newAuthority: PublicKeyFromString,
});

const TransferFeeExtension = type({
  maximumFee: number(),
  mint: PublicKeyFromString,
  transferFeeBasisPoints: number(),
  transferFeeConfigAuthority: PublicKeyFromString,
  withdrawWitheldAuthority: PublicKeyFromString,
});

const DefaultAccountStateExtension = type({
  accountState: string(),
  freezeAuthority: optional(PublicKeyFromString),
  mint: PublicKeyFromString,
});

const Reallocate = type({
  account: PublicKeyFromString,
  extensionTypes: array(string()),
  payer: PublicKeyFromString,
  systemProgram: PublicKeyFromString,
});

const MemoTransferExtension = type({
  account: PublicKeyFromString,
  multisigOwner: optional(PublicKeyFromString),
  owner: optional(PublicKeyFromString),
  signers: optional(array(PublicKeyFromString)),
});

const CreateNativeMint = type({
  nativeMint: PublicKeyFromString,
  payer: PublicKeyFromString,
  systemProgram: PublicKeyFromString,
});

export type TokenInstructionType = Infer<typeof TokenInstructionType>;
export const TokenInstructionType = enums([
  "initializeMint",
  "initializeMint2",
  "initializeAccount",
  "initializeAccount2",
  "initializeAccount3",
  "initializeMultisig",
  "transfer",
  "approve",
  "revoke",
  "setAuthority",
  "mintTo",
  "burn",
  "closeAccount",
  "freezeAccount",
  "thawAccount",
  "transfer2",
  "approve2",
  "mintTo2",
  "burn2",
  "transferChecked",
  "approveChecked",
  "mintToChecked",
  "burnChecked",
  "syncNative",
  "getAccountDataSize",
  "amountToUiAmount",
  "initializeImmutableOwner",
  "uiAmountToAmount",
  "initializeMintCloseAuthority",
  "transferFeeExtension",
  "defaultAccountStateExtension",
  "reallocate",
  "memoTransferExtension",
  "createNativeMint",
  "transferCheckedWithFee",
]);

export const IX_STRUCTS = {
  amountToUiAmount: AmountToUiAmount,
  approve: Approve,
  approve2: ApproveChecked,
  approveChecked: ApproveChecked,
  burn: Burn,
  burn2: BurnChecked,
  burnChecked: BurnChecked,
  closeAccount: CloseAccount,
  createNativeMint: CreateNativeMint,
  defaultAccountStateExtension: DefaultAccountStateExtension,
  freezeAccount: FreezeAccount,
  getAccountDataSize: GetAccountDataSize,
  initializeAccount: InitializeAccount,
  initializeAccount2: InitializeAccount2,
  initializeAccount3: InitializeAccount3,
  initializeImmutableOwner: InitializeImmutableOwner,
  initializeMint: InitializeMint,
  initializeMint2: InitializeMint2,
  initializeMintCloseAuthority: InitializeMintCloseAuthority,
  initializeMultisig: InitializeMultisig,
  memoTransferExtension: MemoTransferExtension,
  mintTo: MintTo,
  mintTo2: MintToChecked,
  mintToChecked: MintToChecked,
  reallocate: Reallocate,
  revoke: Revoke,
  setAuthority: SetAuthority,
  syncNative: SyncNative,
  thawAccount: ThawAccount,
  transfer: Transfer,
  transfer2: TransferChecked,
  transferChecked: TransferChecked,
  transferCheckedWithFee: TransferCheckedWithFee,
  transferFeeExtension: TransferFeeExtension,
  uiAmountToAmount: UiAmountToAmount,
};

export const IX_TITLES = {
  amountToUiAmount: "Amount To UiAmount",
  approve: "Approve",
  approve2: "Approve (Checked)",
  approveChecked: "Approve (Checked)",
  burn: "Burn",
  burn2: "Burn (Checked)",
  burnChecked: "Burn (Checked)",
  closeAccount: "Close Account",
  createNativeMint: "Create Native Mint",
  defaultAccountStateExtension: "Default Account State Extension",
  freezeAccount: "Freeze Account",
  getAccountDataSize: "Get Account Data Size",
  initializeAccount: "Initialize Account",
  initializeAccount2: "Initialize Account (2)",
  initializeAccount3: "Initialize Account (3)",
  initializeImmutableOwner: "Initialize Immutable Owner",
  initializeMint: "Initialize Mint",
  initializeMint2: "Initialize Mint (2)",
  initializeMintCloseAuthority: "Initialize Mint Close Authority",
  initializeMultisig: "Initialize Multisig",
  memoTransferExtension: "Memo Transfer Extension",
  mintTo: "Mint To",
  mintTo2: "Mint To (Checked)",
  mintToChecked: "Mint To (Checked)",
  reallocate: "Reallocate",
  revoke: "Revoke",
  setAuthority: "Set Authority",
  syncNative: "Sync Native",
  thawAccount: "Thaw Account",
  transfer: "Transfer",
  transfer2: "Transfer (Checked)",
  transferChecked: "Transfer (Checked)",
  transferCheckedWithFee: "Tramsfer with fee (Checked)",
  transferFeeExtension: "Transfer Fee Extension",
  uiAmountToAmount: "UiAmount To Amount",
};
