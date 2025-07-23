import type { Block, BlockInfo } from "@ledgerhq/coin-framework/api/index";
import network from "@ledgerhq/live-network/network";
import { getEnv } from "@ledgerhq/live-env";
import { BoilerplateAsset } from "../../types";

export async function getBlock(height: number): Promise<Block<BoilerplateAsset>> {
  // @ts-expect-error: add NODE_BOILERPLATE to libs/env/src/env.ts
  const url = `${getEnv("NODE_BOILERPLATE")}/block/${height}`;
  const { data } = await network({
    url,
    method: "GET",
  });

  const blockInfo: BlockInfo = {
    height: data.blockHeight,
    hash: data.blockHash,
    time: new Date(data.timestamp),
  };

  // Convert block transactions to the expected format
  const transactions = (data.transactions || []).map((tx: any) => ({
    hash: tx.hash,
    failed: false, // Assume transactions in block are successful
    operations: [
      {
        type: "transfer",
        address: tx.Account,
        peer: tx.Destination,
        asset: { type: "native" } as BoilerplateAsset,
        amount: BigInt(tx.Amount),
      },
    ],
    details: tx,
    fees: BigInt(tx.Fee || "0"),
    feesPayer: tx.Account,
  }));

  return {
    info: blockInfo,
    transactions,
  };
}
