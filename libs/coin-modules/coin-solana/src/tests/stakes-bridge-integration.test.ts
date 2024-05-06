import BigNumber from "bignumber.js";
import { SolanaAccount, SolanaStake, Transaction, TransactionStatus } from "../types";
import { NotEnoughBalance } from "@ledgerhq/errors";
import type { Account } from "@ledgerhq/types-live";
import { ChainAPI, LATEST_BLOCKHASH_MOCK } from "../api";
import {
  SolanaStakeAccountIsNotDelegatable,
  SolanaStakeAccountValidatorIsUnchangeable,
} from "../errors";
import { testOnChainData } from "./test-onchain-data";
import getTransactionStatus from "../js-getTransactionStatus";
import { prepareTransaction } from "../js-prepareTransaction";

const baseAccount = {
  balance: new BigNumber(0),
  spendableBalance: new BigNumber(0),
} as Account;

const mockedVoteAccount = {
  parsed: {
    info: {
      authorizedVoters: [
        {
          authorizedVoter: "EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4",
          epoch: 283,
        },
      ],
      authorizedWithdrawer: "EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4",
      commission: 7,
      epochCredits: [
        {
          credits: "98854605",
          epoch: 283,
          previousCredits: "98728105",
        },
      ],
      lastTimestamp: { slot: 122422797, timestamp: 1645796249 },
      nodePubkey: "EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4",
      priorVoters: [],
      rootSlot: 122422766,
      votes: [{ confirmationCount: 1, slot: 122422797 }],
    },
    type: "vote",
  },
  program: "vote",
  space: 3731,
};

const baseTx = {
  family: "solana",
  recipient: "",
  amount: new BigNumber(0),
} as Transaction;

const baseAPI = {
  getLatestBlockhash: () => Promise.resolve(LATEST_BLOCKHASH_MOCK),
  getFeeForMessage: (_msg: unknown) => Promise.resolve(testOnChainData.fees.lamportsPerSignature),
} as ChainAPI;

type StakeTestSpec = {
  activationState: SolanaStake["activation"]["state"];
  txModel: Transaction["model"];
  expectedErrors: Record<string, Error>;
};

/**
 * Some business logic can not be described in terms of transactions and expected status
 * in the test datasets, like stake activation/deactivation, because stake activation is
 * not determenistic and changes with time. Hence the tests here to mock data
 * to be determenistic.
 */

describe("solana staking", () => {
  test("stake.delegate :: status is error: stake account is not delegatable", async () => {
    const stakeDelegateModel: Transaction["model"] & {
      kind: "stake.delegate";
    } = {
      kind: "stake.delegate",
      uiState: {
        stakeAccAddr: testOnChainData.unfundedAddress,
        voteAccAddr: testOnChainData.validatorAddress,
      },
    };

    const stakeTests: StakeTestSpec[] = [
      {
        activationState: "activating",
        txModel: stakeDelegateModel,
        expectedErrors: {
          fee: new NotEnoughBalance(),
          stakeAccAddr: new SolanaStakeAccountIsNotDelegatable(),
        },
      },
      {
        activationState: "active",
        txModel: stakeDelegateModel,
        expectedErrors: {
          fee: new NotEnoughBalance(),
          stakeAccAddr: new SolanaStakeAccountIsNotDelegatable(),
        },
      },
      {
        activationState: "deactivating",
        txModel: {
          ...stakeDelegateModel,
          uiState: {
            ...stakeDelegateModel.uiState,
            voteAccAddr: testOnChainData.unfundedAddress,
          },
        },
        expectedErrors: {
          fee: new NotEnoughBalance(),
          stakeAccAddr: new SolanaStakeAccountValidatorIsUnchangeable(),
        },
      },
    ];

    for (const stakeTest of stakeTests) {
      await runStakeTest(stakeTest);
    }
  });
});

async function runStakeTest(stakeTestSpec: StakeTestSpec) {
  const api = {
    ...baseAPI,
    getMinimumBalanceForRentExemption: () =>
      Promise.resolve(testOnChainData.fees.stakeAccountRentExempt),
    getAccountInfo: () => {
      return Promise.resolve({ data: mockedVoteAccount } as any);
    },
  } as ChainAPI;

  const account: SolanaAccount = {
    ...baseAccount,
    freshAddress: testOnChainData.fundedSenderAddress,
    solanaResources: {
      stakes: [
        {
          stakeAccAddr: testOnChainData.unfundedAddress,
          delegation: {
            stake: 1,
            voteAccAddr: testOnChainData.validatorAddress,
          },
          activation: {
            state: stakeTestSpec.activationState,
          },
        } as SolanaStake,
      ],
      unstakeReserve: BigNumber(0),
    },
  };

  const tx: Transaction = {
    ...baseTx,
    model: stakeTestSpec.txModel,
  };

  const preparedTx = await prepareTransaction(account, tx, api);
  const status = await getTransactionStatus(account, preparedTx);

  const expectedStatus: TransactionStatus = {
    amount: new BigNumber(0),
    estimatedFees: new BigNumber(testOnChainData.fees.lamportsPerSignature),
    totalSpent: new BigNumber(testOnChainData.fees.lamportsPerSignature),
    errors: stakeTestSpec.expectedErrors,
    warnings: {},
  };

  expect(status).toEqual(expectedStatus);
}
