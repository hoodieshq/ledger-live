import { listOperations } from "./listOperations";
import { getListOperations } from "../network/sdk";
import { Operation, Pagination } from "@ledgerhq/coin-framework/lib/api/types";

jest.mock("../network/sdk");

type TestAssetInfo = {
  id: string;
  name: string;
};

const mockOperations: Operation<TestAssetInfo>[] = [
  {
    tx: {
      date: new Date("2024-03-20T10:00:00.000Z"),
      hash: "0x1234567890abcdef",
      fees: BigInt("1000000"),
      block: {
        height: 5,
      },
    },
    operationIndex: 0,
    recipients: ["0xrecipient1"],
    senders: ["0xsender1"],
    type: "OUT",
    value: BigInt("1000000000"),
    asset: {
      id: "test-asset-1",
      name: "Test Asset 1",
    },
  },
  {
    tx: {
      date: new Date("2024-03-20T11:00:00.000Z"),
      hash: "0xabcdef1234567890",
      fees: BigInt("2000000"),
      block: {
        height: 5,
      },
    },
    operationIndex: 0,
    recipients: ["0xrecipient2"],
    senders: ["0xsender2"],
    type: "IN",
    value: BigInt("2000000000"),
    asset: {
      id: "test-asset-2",
      name: "Test Asset 2",
    },
  },
];

const mockGetListOperations = getListOperations as jest.Mock;
mockGetListOperations.mockResolvedValue(mockOperations);

describe("List Operations", () => {
  const mockAddress = "0x1234567890abcdef";
  const mockPagination: Pagination = {
    minHeight: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return operations and last hash", async () => {
    const [operations, lastHash] = await listOperations<TestAssetInfo>(mockAddress, mockPagination);

    expect(operations).toEqual(mockOperations);
    expect(lastHash).toBe(mockOperations[0].tx.hash);
    expect(mockGetListOperations).toHaveBeenCalledWith(mockAddress);
  });

  it("should return empty array and empty string when no operations", async () => {
    mockGetListOperations.mockResolvedValueOnce([]);

    const [operations, lastHash] = await listOperations<TestAssetInfo>(mockAddress, mockPagination);

    expect(operations).toEqual([]);
    expect(lastHash).toBe("");
    expect(mockGetListOperations).toHaveBeenCalledWith(mockAddress);
  });

  it("should handle pagination parameters", async () => {
    const [operations] = await listOperations<TestAssetInfo>(mockAddress, mockPagination);

    expect(operations).toEqual(mockOperations);
    expect(mockGetListOperations).toHaveBeenCalledWith(mockAddress);
  });

  it("should return operations sorted by date in ascending order", async () => {
    const [operations] = await listOperations<TestAssetInfo>(mockAddress, mockPagination);

    expect(operations[1].tx.date.getTime()).toBeGreaterThan(operations[0].tx.date.getTime());
  });
});
