import type { BlockInfo } from "@ledgerhq/coin-framework/api/index";
import network from "@ledgerhq/live-network/network";
import { getEnv } from "@ledgerhq/live-env";

export async function getBlockInfo(height: number): Promise<BlockInfo> {
  // @ts-expect-error: add NODE_BOILERPLATE to libs/env/src/env.ts
  const url = `${getEnv("NODE_BOILERPLATE")}/block/${height}`;
  const { data } = await network({
    url,
    method: "GET",
  });

  return {
    height: data.blockHeight,
    hash: data.blockHash,
    time: new Date(data.timestamp),
  };
}
