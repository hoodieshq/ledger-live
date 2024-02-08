import BigNumber from "bignumber.js";
import { calculateToken2022TransferFees } from "./logic";

function mockTransferFeeConfig({
  bps,
  olderEpoch,
  newerEpoch,
  maxFee,
}: {
  bps: number;
  olderEpoch: number;
  newerEpoch: number;
  maxFee: number;
}) {
  return {
    newerTransferFee: {
      epoch: newerEpoch,
      maximumFee: maxFee,
      transferFeeBasisPoints: bps,
    },
    olderTransferFee: {
      epoch: olderEpoch,
      maximumFee: maxFee,
      transferFeeBasisPoints: bps,
    },
  };
}

describe("solana/logic", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("calculateToken2022TransferFees", () => {
    const newerEpoch = 305;
    const olderEpoch = 295;

    test("Should calculate transferFee: [amount: 1, fee: 10bps, maxFee: 10]", async () => {
      const magnitude = 3;
      const feeBps = 10;
      const maxFee = BigNumber(10).multipliedBy(BigNumber(10).pow(magnitude)).toNumber();
      const amount = BigNumber(1).multipliedBy(BigNumber(10).pow(magnitude)).toNumber();

      const transferFeeConfig = mockTransferFeeConfig({
        bps: feeBps,
        maxFee,
        olderEpoch,
        newerEpoch,
      });

      const transferFees = calculateToken2022TransferFees({
        transferAmount: amount,
        currentEpoch: newerEpoch,
        transferFeeConfigState: transferFeeConfig,
      });
      const expectedFee = 2;
      expect(transferFees).toEqual({
        maxTransferFee: 10_000,
        transferFee: expectedFee,
        feeBps,
        feePercent: 0.1,
        transferAmountExcludingFee: amount - expectedFee,
        transferAmountIncludingFee: amount + expectedFee,
      });
    });

    test("Should calculate transferFee: [amount: 25, fee: 500bps, maxFee: 10]", async () => {
      const magnitude = 3;
      const feeBps = 500;
      const maxFee = BigNumber(5).multipliedBy(BigNumber(10).pow(magnitude)).toNumber();
      const amount = BigNumber(25).multipliedBy(BigNumber(10).pow(magnitude)).toNumber();

      const transferFeeConfig = mockTransferFeeConfig({
        bps: feeBps,
        maxFee,
        olderEpoch,
        newerEpoch,
      });

      const transferFees = calculateToken2022TransferFees({
        transferAmount: amount,
        currentEpoch: newerEpoch,
        transferFeeConfigState: transferFeeConfig,
      });

      const expectedFee = 1316;
      expect(transferFees).toEqual({
        maxTransferFee: 5_000,
        transferFee: expectedFee,
        feeBps,
        feePercent: 5,
        transferAmountExcludingFee: amount - expectedFee,
        transferAmountIncludingFee: amount + expectedFee,
      });
    });

    test("transferFee should be equal maxTransferFee: [amount: 1000, fee: 100bps, maxFee: 1000]", async () => {
      const magnitude = 3;
      const feeBps = 100;
      const maxFee = BigNumber(1).multipliedBy(BigNumber(10).pow(magnitude)).toNumber();
      const amount = BigNumber(10000).multipliedBy(BigNumber(10).pow(magnitude)).toNumber();

      const transferFeeConfig = mockTransferFeeConfig({
        bps: feeBps,
        maxFee,
        olderEpoch,
        newerEpoch,
      });

      const transferFees = calculateToken2022TransferFees({
        transferAmount: amount,
        currentEpoch: newerEpoch,
        transferFeeConfigState: transferFeeConfig,
      });

      const expectedFee = 1000; // max fee;
      expect(transferFees).toEqual({
        maxTransferFee: expectedFee,
        transferFee: expectedFee,
        feeBps,
        feePercent: 1,
        transferAmountExcludingFee: amount - expectedFee,
        transferAmountIncludingFee: amount + expectedFee,
      });
    });
  });
});
