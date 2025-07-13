export * from "./bridge";
export * from "./signer";
export * from "./assets";

export type CantonNativeTransaction = {
  TransactionType: "Payment";
  Account: string;
  Amount: string;
  Destination: string;
  Fee: string;
  Sequence: number;
  SigningPubKey?: string;
  TxnSignature?: string;
};

// Temporary alias for backward compatibility; will be removed later.
export type BoilerplateNativeTransaction = CantonNativeTransaction;
