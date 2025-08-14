import { getEnv } from "@ledgerhq/live-env";
import { makeLRUCache, minutes } from "@ledgerhq/live-network/cache";
import { flow, isArray, isEqual, isObject, isUndefined, mapValues, omitBy } from "lodash/fp";
import { getMockedMethods } from "./mock-data";
import { scanAccounts, sync } from "../../../bridge/mockHelpers";
import { createBridges } from "@ledgerhq/coin-canton/bridge/index";
import { createApi } from "@ledgerhq/coin-canton/api/index";
import { CreateSigner, executeWithSigner } from "../../../bridge/setup";
import Transport from "@ledgerhq/hw-transport";
import { CantonSigner } from "@ledgerhq/coin-canton";
import { LegacySignerCanton } from "@ledgerhq/live-signer-canton";
import { CantonCoinConfig, CantonConfig } from "@ledgerhq/coin-canton/config";
import { getCurrencyConfiguration } from "../../../config";
import { getCryptoCurrencyById } from "../../../currencies";

const LOG_PREFIX = "[canton-mock]";
const debugLog = (...args: unknown[]) => {
  // eslint-disable-next-line no-console
  console.log(LOG_PREFIX, ...args);
};
debugLog("init", {
  PLAYWRIGHT_RUN: getEnv("PLAYWRIGHT_RUN"),
  DETOX: getEnv("DETOX"),
  MOCK: getEnv("MOCK"),
});

// Mock API that returns predefined responses
function mockCantonAPI() {
  const mockedMethods = getMockedMethods();

  const api = new Proxy(
    {},
    {
      get(_, propKey) {
        if (propKey === "then") {
          return undefined;
        }

        const method = propKey.toString();
        debugLog("api access", { method });
        const mocks = mockedMethods.filter(mock => mock.method === method);

        if (mocks.length === 0) {
          const message = `no mock found for api method: ${method}`;
          debugLog("api error", { message });
          throw new Error(message);
        }

        return function (...rawArgs: unknown[]) {
          const args = preprocessArgs(method, rawArgs);
          debugLog("api call", { method, args });
          const mock = mocks.find(({ params: mockArgs }) => isEqual(args)(mockArgs));

          if (mock === undefined) {
            const argsJson = JSON.stringify(args);
            const message = `no mock found for api method ${method} with args ${argsJson}`;
            debugLog("api error", { message });
            throw new Error(message);
          }

          debugLog("api return", { method, answerPreview: typeof mock.answer });
          return Promise.resolve(mock.answer);
        };
      },
    },
  );

  return api;
}

function removeUndefineds(input: unknown): unknown {
  return isObject(input) && !isArray(input)
    ? flow(omitBy(isUndefined), mapValues(removeUndefineds))(input)
    : input;
}

function preprocessArgs(method: string, rawArgs: unknown[]): unknown[] {
  return rawArgs.map(removeUndefineds);
}

// The calls data can be copied to mock-data.ts from the file.
// This function creates a live API with logging for generating mock data
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function createMockDataForAPI() {
  const createSigner: CreateSigner<CantonSigner> = (transport: Transport) => {
    return new LegacySignerCanton(transport);
  };

  const signerContext = executeWithSigner(createSigner);

  const apiGetter = makeLRUCache(
    (config: CantonConfig) => Promise.resolve(createApi(config)),
    config => config.nodeUrl,
    minutes(1000),
  );

  return {
    getAPI: apiGetter,
    getQueuedAPI: apiGetter,
    getQueuedAndCachedAPI: apiGetter,
    signerContext,
  };
}

function getMockedAPIs() {
  const createSigner: CreateSigner<CantonSigner> = (transport: Transport) => {
    debugLog("createSigner: LegacySignerCanton");
    return new LegacySignerCanton(transport);
  };

  const getCurrencyConfig = () => {
    const cfg = getCurrencyConfiguration<CantonCoinConfig>(getCryptoCurrencyById("canton_network"));
    debugLog("getCurrencyConfig created");
    return cfg;
  };

  const signerContext = executeWithSigner(createSigner);
  debugLog("signerContext created");

  return {
    api: mockCantonAPI(),
    signerContext,
    getCurrencyConfig,
  };
}

const mockedAPIs = getMockedAPIs();
debugLog("creating bridges with mockedAPIs");
const bridges = createBridges(mockedAPIs.signerContext, mockedAPIs.getCurrencyConfig);
debugLog("bridges created", {
  currencyBridge: !!bridges.currencyBridge,
  accountBridge: !!bridges.accountBridge,
  currencyBridgeMethods: Object.keys(bridges.currencyBridge || {}),
  accountBridgeMethods: Object.keys(bridges.accountBridge || {}),
});

// Log the original scanAccounts method to understand its signature
if (bridges.currencyBridge && bridges.currencyBridge.scanAccounts) {
  debugLog("original scanAccounts method", {
    name: bridges.currencyBridge.scanAccounts.name,
    length: bridges.currencyBridge.scanAccounts.length,
  });
}

// const usingTestEnv = Boolean(getEnv("PLAYWRIGHT_RUN")) || Boolean(getEnv("DETOX"));
const usingTestEnv = true;
debugLog("exporting bridges", { usingTestEnv });

export default usingTestEnv
  ? {
    accountBridge: {
      ...bridges.accountBridge,
      sync: (...args: unknown[]) => {
        debugLog("accountBridge.sync called", { args });
        // @ts-expect-error: preserve original signature at runtime
        return sync(...args);
      },
    },
    currencyBridge: {
      ...bridges.currencyBridge,
      preload: (...args: unknown[]) => {
        debugLog("currencyBridge.preload called", { args });
        const result = Promise.resolve({});
        result
          .then(() => {
            debugLog("currencyBridge.preload resolved");
          })
          .catch(error => {
            debugLog("currencyBridge.preload error", { error });
          });
        return result;
      },
      hydrate: (...args: unknown[]) => {
        debugLog("currencyBridge.hydrate called", { args });
      },
      scanAccounts: (...args: unknown[]) => {
        debugLog("currencyBridge.scanAccounts called", { args });
        try {
          // Always use the mock scanAccounts from mockHelpers
          // @ts-expect-error: preserve original signature at runtime
          const result = scanAccounts(...args);
          debugLog("currencyBridge.scanAccounts result type", {
            resultType: typeof result,
            isObservable: result && typeof result.subscribe === "function",
          });
          return result;
        } catch (error) {
          debugLog("currencyBridge.scanAccounts error", { error });
          throw error;
        }
      },
    },
  }
  : bridges;
