import { fromOperationExtraRaw, toOperationExtraRaw } from "./formatters";

describe("formatters", () => {
  describe("fromOperationExtraRaw", () => {
    it("should return an empty object when no extraRaw is provided", () => {
      const result = fromOperationExtraRaw(undefined);
      expect(result).toEqual({});
    });

    // Add more tests as needed
  });

  describe("toOperationExtraRaw", () => {
    it("should return an empty object when no extra is provided", () => {
      const result = toOperationExtraRaw(undefined);
      expect(result).toEqual({});
    });

    // Add more tests as needed
  });
});
