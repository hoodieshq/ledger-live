import { ConfigInfo } from "@ledgerhq/live-config/LiveConfig";
import { getEnv } from "@ledgerhq/live-env";

export const cantonConfig: Record<string, ConfigInfo> = {
  config_currency_canton: {
    type: "object",
    default: {
      status: {
        type: "active",
      },
      node: {
        url: getEnv("API_CANTON_NODE_PROXY") || "https://canton.testnet.canton.io",
      },
    },
  },
};