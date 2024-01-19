/* eslint-disable @typescript-eslint/no-redeclare */

import {
  Infer,
  number,
  literal,
  enums,
  union,
  boolean,
  array,
  type,
  nullable,
  size,
  string,
  optional,
  unknown,
} from "superstruct";
import { PublicKeyFromString } from "../validators/pubkey";

// Token2022 extensions guide: https://spl.solana.com/token-2022/extensions

export type TokenAccountState = Infer<typeof AccountState>;
export const AccountState = enums(["initialized", "uninitialized", "frozen"]);

// token account extensions
export type TokenAccountExtensionType = Infer<typeof TokenAccountExtensionType>;
export const TokenAccountExtensionType = enums([
  "transferFeeAmount",
  "immutableOwner",
  "memoTransfer",
  "cpiGuard",
  "nonTransferableAccount",
  "confidentialTransferAccount",
]);

export type ImmutableOwnerExt = Infer<typeof ImmutableOwnerExt>;
export const ImmutableOwnerExt = type({
  extension: literal("immutableOwner"),
});

export type MemoTransferExt = Infer<typeof MemoTransferExt>;
export const MemoTransferExt = type({
  extension: literal("memoTransfer"),
  state: type({
    requireIncomingTransferMemos: boolean(),
  }),
});

export type TransferFeeAmountExt = Infer<typeof TransferFeeAmountExt>;
export const TransferFeeAmountExt = type({
  extension: literal("transferFeeAmount"),
  state: type({
    withheldAmount: number(),
  }),
});

export type СpiGuardExt = Infer<typeof СpiGuardExt>;
export const СpiGuardExt = type({
  extension: literal("cpiGuard"),
  state: type({
    lockCpi: boolean(),
  }),
});

export type NonTransferableAccountExt = Infer<typeof NonTransferableAccountExt>;
export const NonTransferableAccountExt = type({
  extension: literal("nonTransferableAccount"),
});

export type ConfidentialTransferAccountExt = Infer<typeof ConfidentialTransferAccountExt>;
export const ConfidentialTransferAccountExt = type({
  extension: literal("confidentialTransferAccount"),
  state: type({
    approved: boolean(),
    elgamalPubkey: PublicKeyFromString,
    pendingBalanceLo: string(),
    pendingBalanceHi: string(),
    availableBalance: string(),
    decryptableAvailableBalance: string(),
    allowConfidentialCredits: boolean(),
    allowNonConfidentialCredits: boolean(),
    pendingBalanceCreditCounter: number(),
    maximumPendingBalanceCredit_counter: number(),
    expectedPendingBalanceCreditCounter: number(),
    actualPendingBalanceCreditCounter: number(),
  }),
});
export const UnknownExt = type({
  extension: string(),
  state: optional(unknown()),
});

export type TokenAccountExtensions = Infer<typeof TokenAccountExtensions>;
export const TokenAccountExtensions = array(
  union([
    ImmutableOwnerExt,
    MemoTransferExt,
    TransferFeeAmountExt,
    СpiGuardExt,
    NonTransferableAccountExt,
    UnknownExt,
  ]),
);

// mint extensions
export type MintExtensionType = Infer<typeof MintExtensionType>;
export const MintExtensionType = enums([
  "transferFeeConfig",
  "mintCloseAuthority",
  "permanentDelegate",
  "interestBearingConfig",
  "defaultAccountState",
  "nonTransferable",
  "transferHook",
  "metadataPointer",
  "tokenMetadata",
  "confidentialTransferMint",
]);

const TransferFee = type({
  epoch: number(),
  maximumFee: number(),
  transferFeeBasisPoints: number(),
});
export type TransferFeeConfigExt = Infer<typeof TransferFeeConfigExt>;
export const TransferFeeConfigExt = type({
  extension: literal("transferFeeConfig"),
  state: type({
    newerTransferFee: TransferFee,
    olderTransferFee: TransferFee,
    transferFeeConfigAuthority: PublicKeyFromString,
    withdrawWithheldAuthority: PublicKeyFromString,
    withheldAmount: number(),
  }),
});

export type MintCloseAuthorityExt = Infer<typeof MintCloseAuthorityExt>;
export const MintCloseAuthorityExt = type({
  extension: literal("mintCloseAuthority"),
  state: type({
    closeAuthority: PublicKeyFromString,
  }),
});

export type PermanentDelegateExt = Infer<typeof PermanentDelegateExt>;
export const PermanentDelegateExt = type({
  extension: literal("permanentDelegate"),
  state: type({
    delegate: PublicKeyFromString,
  }),
});

export type InterestBearingConfigExt = Infer<typeof InterestBearingConfigExt>;
export const InterestBearingConfigExt = type({
  extension: literal("interestBearingConfig"),
  state: type({
    rateAuthority: PublicKeyFromString,
    initializationTimestamp: number(),
    preUpdateAverageRate: number(),
    lastUpdateTimestamp: number(),
    currentRate: number(),
  }),
});

export type DefaultAccountStateExt = Infer<typeof DefaultAccountStateExt>;
export const DefaultAccountStateExt = type({
  extension: literal("defaultAccountState"),
  state: type({
    state: AccountState,
  }),
});

export type NonTransferableExt = Infer<typeof NonTransferableExt>;
export const NonTransferableExt = type({
  extension: literal("nonTransferable"),
});

export type TransferHookExt = Infer<typeof TransferHookExt>;
export const TransferHookExt = type({
  extension: literal("transferHook"),
  state: type({
    authority: PublicKeyFromString,
    programId: PublicKeyFromString,
  }),
});

export type MetadataPointerExt = Infer<typeof MetadataPointerExt>;
export const MetadataPointerExt = type({
  extension: literal("metadataPointer"),
  state: type({
    authority: nullable(PublicKeyFromString),
    metadataAddress: nullable(PublicKeyFromString),
  }),
});

export type TokenMetadataExt = Infer<typeof TokenMetadataExt>;
export const TokenMetadataExt = type({
  extension: literal("tokenMetadata"),
  state: type({
    additionalMetadata: array(size(array(string()), 2, 2)),
    mint: PublicKeyFromString,
    name: string(),
    symbol: string(),
    updateAuthority: optional(PublicKeyFromString),
    uri: string(),
  }),
});

export type ConfidentialTransferMintExt = Infer<typeof ConfidentialTransferMintExt>;
export const ConfidentialTransferMintExt = type({
  extension: literal("confidentialTransferMint"),
  state: type({
    authority: optional(PublicKeyFromString),
    autoApproveNewAccounts: boolean(),
    auditorElgamalPubkey: optional(PublicKeyFromString),
  }),
});

export type MintExtensions = Infer<typeof MintExtensions>;
export const MintExtensions = array(
  union([
    TransferFeeConfigExt,
    MintCloseAuthorityExt,
    PermanentDelegateExt,
    InterestBearingConfigExt,
    DefaultAccountStateExt,
    NonTransferableExt,
    TransferHookExt,
    MetadataPointerExt,
    TokenMetadataExt,
    ConfidentialTransferMintExt,
    UnknownExt,
  ]),
);
