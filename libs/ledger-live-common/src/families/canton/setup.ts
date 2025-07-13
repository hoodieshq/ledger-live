// Goal of this file is to inject all necessary device/signer dependency to coin-modules

import type { Bridge, CurrencyBridge, AccountBridge } from "@ledgerhq/types-live";
import type { Resolver } from "../../hw/getAddress/types";
import { Observable } from "rxjs";
import BigNumber from "bignumber.js";

// Minimal placeholder implementations for now
// These will be replaced with proper implementations once the canton module is built

const currencyBridge: CurrencyBridge = {
  preload: async () => ({}),
  hydrate: () => {},
  scanAccounts: () => new Observable(() => {}),
};

const accountBridge: AccountBridge<any> = {
  sync: () => new Observable(() => {}),
  receive: () => new Observable(() => {}),
  createTransaction: () => ({
    family: "canton",
    amount: new BigNumber(0),
    recipient: "",
    fee: null,
  }),
  updateTransaction: (t, patch) => ({ ...t, ...patch }),
  prepareTransaction: async (account, transaction) => transaction,
  getTransactionStatus: async () => ({
    errors: {},
    warnings: {},
    estimatedFees: new BigNumber(0),
    amount: new BigNumber(0),
    totalSpent: new BigNumber(0),
  }),
  estimateMaxSpendable: async () => new BigNumber(0),
  signOperation: () => new Observable(() => {}),
  broadcast: async () => ({
    id: "mock-operation-id",
    hash: "mock-hash",
    type: "OUT",
    value: new BigNumber(0),
    fee: new BigNumber(0),
    blockHash: null,
    blockHeight: null,
    senders: [],
    recipients: [],
    accountId: "mock-account-id",
    date: new Date(),
    extra: {},
  }),
  getSerializedAddressParameters: () => Buffer.from([]),
};

const bridge: Bridge<any> = {
  currencyBridge,
  accountBridge,
};

const resolver: Resolver = () => {
  throw new Error("Canton resolver not implemented yet");
};

const cliTools = {
  options: [],
  inferTransactions: () => {
    throw new Error("Canton CLI tools not implemented yet");
  },
};

export { bridge, cliTools, resolver };
