import { getBalance } from "./getBalance";
import { getAccount } from "../network";

// Mock the getAccount function
jest.mock("../network", () => ({
  getAccount: jest.fn(),
}));

describe("getBalance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct balance as bigint", async () => {
    // Mock the getAccount response
    const mockBalance = { balance: 1000000000 };
    (getAccount as jest.Mock).mockResolvedValue(mockBalance);

    const address = "0x123";
    const result = await getBalance(address);

    expect(getAccount).toHaveBeenCalledWith(address);
    expect(result).toBe(BigInt(mockBalance.balance.toString()));
  });

  it("should handle zero balance", async () => {
    const mockBalance = { balance: 0 };
    (getAccount as jest.Mock).mockResolvedValue(mockBalance);

    const address = "0x123";
    const result = await getBalance(address);

    expect(getAccount).toHaveBeenCalledWith(address);
    expect(result).toBe(BigInt("0"));
  });

  it("should handle API errors gracefully", async () => {
    const errorMessage = "Network error";
    (getAccount as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const address = "0x123";
    await expect(getBalance(address)).rejects.toThrow(errorMessage);
  });
});
