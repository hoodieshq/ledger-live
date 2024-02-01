import "../../../__tests__/test-helpers/setup";
import BigNumber from "bignumber.js";
import cloneDeep from "lodash/cloneDeep";
import {
  SolanaAccount,
  SolanaTokenAccount,
  TokenTransferCommand,
  TokenTransferTransaction,
  Transaction,
  TransactionStatus,
} from "../types";

import { findTokenByAddressInCurrency } from "@ledgerhq/cryptoassets";
import { TokenCurrency } from "@ledgerhq/types-cryptoassets";
import type { Account } from "@ledgerhq/types-live";
import {
  SolanaRecipientMemoIsRequired,
  SolanaTokenAccountFrozen,
  SolanaTokenNonTransferable,
} from "../errors";
import { calculateToken2022TransferFees, encodeAccountIdWithTokenAccountAddress } from "../logic";
import { ChainAPI } from "../api";
import getTransactionStatus from "../js-getTransactionStatus";
import { prepareTransaction } from "../js-prepareTransaction";
import { encodeAccountId } from "../../../account";
import { LATEST_BLOCKHASH_MOCK } from "../bridge/mock-data";
import { NonTransferableExt, TransferFeeConfigExt } from "../api/chain/account/tokenExtensions";
import { PublicKey } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

// fake addresses
const testData = {
  address1: "8eqMbac28hkTseV4ysPy3bvgokaETmoSD69TVw7FT2mB",
  address2: "6oK54jLodm3D5Qd7Zju5D4LPXhWX61hzog15pvc6UVrX",
  address3: "DYS9SVj8nhK2V7NprSRqbWpiF8euSGWv4QTSX45HTbfX",
  mintAddress: "So11111111111111111111111111111111111111112",
  ataAddress1: PublicKey.findProgramAddressSync(
    [
      new PublicKey("8eqMbac28hkTseV4ysPy3bvgokaETmoSD69TVw7FT2mB").toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      new PublicKey("So11111111111111111111111111111111111111112").toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  )[0].toBase58(),
  fees: 5000,
};

const mainAccId = encodeAccountId({
  type: "js",
  version: "2",
  currencyId: "solana",
  xpubOrAddress: testData.address1,
  derivationMode: "solanaMain",
});

const wSolSubAccId = encodeAccountIdWithTokenAccountAddress(mainAccId, testData.ataAddress1);

const wSolToken = findTokenByAddressInCurrency(testData.mintAddress, "solana") as TokenCurrency;

const baseAccount = {
  balance: new BigNumber(0),
  spendableBalance: new BigNumber(0),
} as Account;

const baseAPI = {
  getLatestBlockhash: () => Promise.resolve(LATEST_BLOCKHASH_MOCK),
  getFeeForMessage: (_msg: unknown) => Promise.resolve(testData.fees),
  getBalance: (_: string) => Promise.resolve(10),
} as ChainAPI;

describe("Solana tokens bridge integration tests", () => {
  const baseSolanaAccount: SolanaAccount = {
    ...baseAccount,
    freshAddress: testData.address1,
    solanaResources: { stakes: [], unstakeReserve: BigNumber(0) },
  };
  const baseTxModel: TokenTransferTransaction = {
    kind: "token.transfer",
    uiState: {
      subAccountId: wSolSubAccId,
    },
  };
  const baseTx: Transaction = {
    model: baseTxModel,
    amount: new BigNumber(10),
    recipient: testData.address2,
    family: "solana",
  };

  const baseAtaMock = {
    parsed: {
      info: {
        isNative: false,
        mint: wSolToken.contractAddress,
        owner: testData.address1,
        state: "initialized",
        tokenAmount: {
          amount: "10000000",
          decimals: wSolToken.units[0].magnitude,
          uiAmount: 10.0,
          uiAmountString: "10",
        },
      },
      type: "account",
    },
    program: "spl-token",
    space: 165,
  };
  const frozenAtaMock = {
    ...baseAtaMock,
    parsed: {
      ...baseAtaMock.parsed,
      info: {
        ...baseAtaMock.parsed.info,
        state: "frozen",
      },
    },
  };

  const mockedTokenAcc: SolanaTokenAccount = {
    type: "TokenAccount",
    id: wSolSubAccId,
    parentId: mainAccId,
    token: wSolToken,
    balance: new BigNumber(100),
    operations: [],
    pendingOperations: [],
    spendableBalance: new BigNumber(100),
    state: "initialized",
    creationDate: new Date(),
    operationsCount: 0,
    starred: false,
    tokenProgram: "spl-token",
    balanceHistoryCache: {
      HOUR: { balances: [], latestDate: null },
      DAY: { balances: [], latestDate: null },
      WEEK: { balances: [], latestDate: null },
    },
    swapHistory: [],
  };

  const baseAta2022Mock = {
    parsed: {
      info: {
        isNative: false,
        mint: wSolToken.contractAddress,
        owner: testData.address1,
        state: "initialized",
        tokenAmount: {
          amount: "10000000",
          decimals: wSolToken.units[0].magnitude,
          uiAmount: 10.0,
          uiAmountString: "10",
        },
      },
      type: "account",
    },
    program: "spl-token-2022",
    space: 165,
  };
  const baseTokenMintMock = {
    data: {
      parsed: {
        info: {
          decimals: 9,
          freezeAuthority: null,
          isInitialized: true,
          mintAuthority: null,
          supply: "0",
        },
        type: "mint",
      },
      program: "spl-token",
      space: 82,
    },
    executable: false,
    lamports: 419787401967,
    owner: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    rentEpoch: 304,
  };
  const baseToken2022MintMock = {
    ...baseTokenMintMock,
    data: {
      ...baseTokenMintMock.data,
      parsed: {
        ...baseTokenMintMock.data.parsed,
        info: {
          ...baseTokenMintMock.data.parsed.info,
          extensions: [] as any[],
        },
      },
      program: "spl-token-2022",
    },
  };
  const mockedToken2022Acc: SolanaTokenAccount = {
    ...mockedTokenAcc,
    tokenProgram: "spl-token-2022",
  };

  test("token.transfer :: status is error: sender ATA is frozen", async () => {
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(baseTokenMintMock as any);
        }
        return Promise.resolve({ data: baseAtaMock } as any);
      },
    } as ChainAPI;

    const tokenAcc: SolanaTokenAccount = {
      ...mockedTokenAcc,
      state: "frozen",
    };
    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [tokenAcc],
    };

    const preparedTx = await prepareTransaction(account, baseTx, api);
    const receivedTxStatus = await getTransactionStatus(account, preparedTx);
    const expectedTxStatus: TransactionStatus = {
      amount: new BigNumber(10),
      estimatedFees: new BigNumber(testData.fees),
      totalSpent: new BigNumber(10),
      errors: {
        amount: new SolanaTokenAccountFrozen(),
      },
      warnings: {},
    };

    expect(receivedTxStatus).toEqual(expectedTxStatus);
  });

  test("token.transfer :: status is error: recipient ATA is frozen", async () => {
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(baseTokenMintMock as any);
        }
        return Promise.resolve({ data: frozenAtaMock } as any);
      },
    } as ChainAPI;

    const tokenAcc: SolanaTokenAccount = {
      ...mockedTokenAcc,
    };
    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [tokenAcc],
    };

    const preparedTx = await prepareTransaction(account, baseTx, api);
    const receivedTxStatus = await getTransactionStatus(account, preparedTx);
    const expectedTxStatus: TransactionStatus = {
      amount: new BigNumber(10),
      estimatedFees: new BigNumber(testData.fees),
      totalSpent: new BigNumber(10),
      errors: {
        recipient: new SolanaTokenAccountFrozen(),
      },
      warnings: {},
    };

    expect(receivedTxStatus).toEqual(expectedTxStatus);
  });

  test("token2022.transfer :: status is success", async () => {
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(baseToken2022MintMock as any);
        }
        return Promise.resolve({ data: baseAta2022Mock } as any);
      },
    } as ChainAPI;

    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [mockedToken2022Acc],
    };

    const preparedTx = await prepareTransaction(account, baseTx, api);
    const receivedTxStatus = await getTransactionStatus(account, preparedTx);
    const expectedTxStatus: TransactionStatus = {
      amount: new BigNumber(10),
      estimatedFees: new BigNumber(testData.fees),
      totalSpent: new BigNumber(10),
      errors: {},
      warnings: {},
    };

    expect(receivedTxStatus).toEqual(expectedTxStatus);
  });

  test("token2022.transfer :: token with undefined tokenProgram :: status is success", async () => {
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(baseToken2022MintMock as any);
        }
        return Promise.resolve({ data: baseAta2022Mock } as any);
      },
    } as ChainAPI;

    const token2022Acc: SolanaTokenAccount = {
      ...mockedToken2022Acc,
      tokenProgram: undefined,
    };
    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [token2022Acc],
    };

    const preparedTx = await prepareTransaction(account, baseTx, api);
    const receivedTxStatus = await getTransactionStatus(account, preparedTx);
    const expectedTxStatus: TransactionStatus = {
      amount: new BigNumber(10),
      estimatedFees: new BigNumber(testData.fees),
      totalSpent: new BigNumber(10),
      errors: {},
      warnings: {},
    };

    expect(receivedTxStatus).toEqual(expectedTxStatus);
  });

  test("token2022.transfer :: ATA with required memo :: status is error", async () => {
    const ataWithRequiredMemoMock = {
      ...baseAta2022Mock,
      parsed: {
        ...baseAta2022Mock.parsed,
        info: {
          ...baseAta2022Mock.parsed.info,
          extensions: [
            {
              extension: "memoTransfer",
              state: { requireIncomingTransferMemos: true },
            },
          ],
        },
      },
    };
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(baseToken2022MintMock as any);
        }
        return Promise.resolve({ data: ataWithRequiredMemoMock } as any);
      },
      getBalance: () => Promise.resolve(10),
    } as ChainAPI;

    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [mockedToken2022Acc],
    };

    const preparedTx = await prepareTransaction(account, baseTx, api);
    const receivedTxStatus = await getTransactionStatus(account, preparedTx);
    const expectedErrors = {
      memo: new SolanaRecipientMemoIsRequired(),
      transaction: new SolanaRecipientMemoIsRequired(),
    };

    expect(receivedTxStatus.errors).toEqual(expectedErrors);
  });

  test("token2022.transfer :: correct transfer fee extension calculations", async () => {
    const mintWithTransferFeeMock = cloneDeep(baseToken2022MintMock);
    mintWithTransferFeeMock.data.program = "spl-token-2022";

    const magnitude = BigNumber(10).pow(baseTokenMintMock.data.parsed.info.decimals);
    const maxFee = BigNumber(10).times(magnitude).toNumber();
    const bps = 100;
    const transferConfigExt: TransferFeeConfigExt = {
      extension: "transferFeeConfig",
      state: {
        newerTransferFee: {
          epoch: 300,
          maximumFee: maxFee,
          transferFeeBasisPoints: bps,
        },
        olderTransferFee: {
          epoch: 300,
          maximumFee: maxFee,
          transferFeeBasisPoints: bps,
        },
        transferFeeConfigAuthority: null,
        withdrawWithheldAuthority: null,
        withheldAmount: 0,
      },
    };
    mintWithTransferFeeMock.data.parsed.info.extensions = [transferConfigExt];
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(mintWithTransferFeeMock as any);
        }
        return Promise.resolve({ data: baseAta2022Mock });
      },
      getBalance: () => Promise.resolve(BigNumber(100).times(magnitude).toNumber()),
      getEpochInfo: () => Promise.resolve({ epoch: 300 } as any),
    } as ChainAPI;

    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [
        {
          ...mockedToken2022Acc,
          balance: BigNumber(100).times(magnitude),
          spendableBalance: BigNumber(100).times(magnitude),
        },
      ],
    };

    const tx: Transaction = {
      ...baseTx,
      amount: BigNumber(1).times(magnitude),
      model: {
        ...baseTxModel,
        uiState: {
          ...baseTxModel.uiState,
          includeTransferFees: true,
        },
      },
    };

    const preparedTx = await prepareTransaction(account, tx, api);
    const receivedTxStatus = await getTransactionStatus(account, preparedTx);

    const expectedTxStatus: TransactionStatus = {
      amount: tx.amount,
      estimatedFees: new BigNumber(testData.fees),
      totalSpent: tx.amount,
      errors: {},
      warnings: {},
    };
    expect(receivedTxStatus).toEqual(expectedTxStatus);

    const expectedExtensions = {
      transferFee: calculateToken2022TransferFees({
        transferAmount: tx.amount.toNumber(),
        currentEpoch: 300,
        transferFeeConfigState: transferConfigExt.state,
      }),
    };

    expect(
      (preparedTx.model.commandDescriptor?.command as TokenTransferCommand).extensions,
    ).toEqual(expectedExtensions);
  });

  test("token2022.transfer :: NonTransferable token :: tx returns SolanaTokenNonTransferable error", async () => {
    const mintWithNonTransferableExtensionMock = cloneDeep(baseToken2022MintMock);
    mintWithNonTransferableExtensionMock.data.parsed.info.extensions = [
      { extension: "nonTransferable" } as NonTransferableExt,
    ];
    const api = {
      ...baseAPI,
      getAccountInfo: (address: string) => {
        if (address === wSolToken.contractAddress) {
          return Promise.resolve(mintWithNonTransferableExtensionMock as any);
        }
        return Promise.resolve({ data: baseAta2022Mock } as any);
      },
    } as ChainAPI;

    const account: SolanaAccount = {
      ...baseSolanaAccount,
      subAccounts: [mockedToken2022Acc],
    };

    expect(prepareTransaction(account, baseTx, api)).rejects.toThrow(SolanaTokenNonTransferable);
  });
});
