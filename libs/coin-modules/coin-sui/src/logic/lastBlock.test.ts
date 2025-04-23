import { lastBlock } from "./lastBlock";
import { getLastBlock } from "../network/sdk";
import { BLOCK_HEIGHT } from "../network/sdk";

jest.mock("../network/sdk");

describe("lastBlock", () => {
  const mockHash = "0x1234567890abcdef";

  beforeEach(() => {
    jest.clearAllMocks();
    (getLastBlock as jest.Mock).mockResolvedValue(mockHash);
  });

  it("should return block info with correct height and hash", async () => {
    const result = await lastBlock();

    expect(result).toEqual({
      height: BLOCK_HEIGHT,
      hash: mockHash,
    });
    expect(getLastBlock).toHaveBeenCalledTimes(1);
  });
});
