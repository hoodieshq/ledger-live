import { createApi } from ".";
import { CantonConfig } from "../config";

describe("createApi", () => {
  it("should return every api methods", () => {
    const config: CantonConfig = {
      nodeUrl: "https://canton.testnet.canton.io",
      minReserve: 1000000000000000000,
    };
    const api = createApi(config);
    expect(api.broadcast).toBeDefined();
    expect(api.combine).toBeDefined();
    expect(api.craftTransaction).toBeDefined();
    expect(api.estimateFees).toBeDefined();
    expect(api.getBalance).toBeDefined();
    expect(api.lastBlock).toBeDefined();
    expect(api.listOperations).toBeDefined();
  });
});
