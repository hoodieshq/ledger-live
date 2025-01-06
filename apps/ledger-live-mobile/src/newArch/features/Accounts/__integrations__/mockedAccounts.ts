import BigNumber from "bignumber.js";
import { AccountsState } from "~/reducers/types";

export const MockedAccounts: AccountsState = {
  active: [
    {
      type: "Account",
      id: "mock:1:cronos:0.7681622993167663:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "0x71DE878364D9B9DC510E5BD13E0AC3372D00D5AF",
      freshAddressPath: "44'/60'/0'/0/0",
      blockHeight: 157668,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 117,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "cronos",
        coinType: 60,
        name: "Cronos",
        managerAppName: "Ethereum",
        ticker: "CRO",
        scheme: "cro",
        color: "#002D74",
        family: "evm",
        ethereumLikeInfo: { chainId: 25 },
        units: [{ name: "CRO", code: "CRO", magnitude: 18 }],
        explorerViews: [
          {
            tx: "https://cronoscan.com/tx/$hash",
            address: "https://cronoscan.com/address/$address",
            token: "https://cronoscan.com/token/$contractAddress?a=$address",
          },
        ],
      },
      lastSyncDate: new Date("2024-12-11T09:54:35.938Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            27291355, 27291355, 27291355, 27291355, 27291355, 27291355, 27291355, 27291355,
            28254686, 34522086, 34522086, 34522086, 34522086, 34522086, 34522086, 34522086,
            34522086, 34522086, 34522086, 34522086, 34522086, 34522086, 34522086, 34522086,
            34522086, 34522086, 35413283, 35413283, 35413283, 35413283, 35423548, 35423548,
            35423548, 35423548, 35423548, 35423548, 31419934, 31419934, 27592754, 27592754,
            27592754, 27592754, 27592754, 27592754, 27592754, 27929605, 27929605, 27929605,
            29280430, 29280430, 29280430, 29280430, 30745273, 30745273, 30745273, 30745273,
            30745273, 32553674, 32553674, 32553674, 32553674, 32553674, 32319070, 34499362,
            34499362, 34499362, 34499362, 34499362, 34499362, 34499362, 34499362, 34499362,
            34499362, 31726261, 31474137, 31474137, 31474137, 33954460, 33954460, 34432840,
            34432840, 34432840, 34432840, 34475408, 34475408, 42435001, 42435001, 42414060,
            43673041, 43673041, 44256130, 44619945, 44370969, 44370969, 44370969, 44370969,
            44370969, 44370969, 44370969, 44370969, 44370969, 45470901, 45470901, 45470901,
            45470901, 45470901, 45470901, 45470901, 45470901, 45470901, 45470901, 45470901,
            45470901, 45470901, 45470901, 43917362, 43917362, 41970580, 46074386, 46074386,
            46399465, 46399465, 46399465, 46399465, 46399465, 46399465, 46399465, 46399465,
            46996242, 46996242, 45872904, 45872904, 45872904, 45872904, 45872904, 46185938,
            46185938, 46533875, 47081103, 47081103, 47081103, 47081103, 47081103, 47081103,
            47081103, 47081103, 47081103, 47081103, 47081103, 47081103, 47081103, 44585722,
            44585722, 44763386, 44763386, 44763386, 44763386, 44763386, 44763386, 44141697,
            47492549, 48701434, 48701434, 48701434, 48701434, 48701434, 48701434, 48701434,
            48701434, 49543493, 49543493, 49543493, 49543493, 49543493, 49543493, 49543493,
            49543493, 49543493, 49543493, 49543493, 49594821, 49594821, 47035383, 47035383,
            47035383, 47035383, 47035383, 48118480, 46118727, 49257559, 49418387, 50444133,
            50444133,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 2089543, 7816282, 16835018, 23178383, 19582248, 24381793, 31133457, 35132963,
            24959952, 34522086, 27592754, 32319070, 42435001, 45470901, 45872904, 44763386,
            47035383,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [0, 31133457, 45470901],
          latestDate: 1733612400000,
        },
      },
      xpub: "B3FFC394FA819AD7F12ED1742C331BE0DBB94F723BE97ECAB6B894C283B9D6D9",
    },
    {
      type: "Account",
      id: "mock:1:dash:0.6363282668745929:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "13jgNfUbhAxPXVChS4xfU8VQhvead",
      freshAddressPath: "44'/5'/0'/0/0",
      blockHeight: 109869,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 74,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "dash",
        coinType: 5,
        name: "Dash",
        managerAppName: "Dash",
        ticker: "DASH",
        scheme: "dash",
        color: "#0e76aa",
        family: "bitcoin",
        blockAvgTime: 150,
        bitcoinLikeInfo: {
          P2PKH: 76,
          P2SH: 16,
          XPUBVersion: 50221816,
        },
        units: [
          { name: "dash", code: "DASH", magnitude: 8 },
          { name: "satoshi", code: "sat", magnitude: 0 },
        ],
        explorerViews: [
          {
            tx: "https://explorer.dash.org/insight/tx/$hash",
            address: "https://explorer.dash.org/insight/address/$address",
          },
        ],
        explorerId: "dash",
      },
      lastSyncDate: new Date("2024-12-11T09:54:36.544Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            439997026, 439997026, 439997026, 439997026, 439997026, 439997026, 695643000, 695643000,
            695643000, 708158592, 708158592, 708158592, 708158592, 708158592, 698865453, 698865453,
            698865453, 683451138, 683451138, 683451138, 733858028, 733858028, 733858028, 733858028,
            733858028, 733858028, 733858028, 733130378, 733130378, 757202252, 757202252, 757202252,
            757202252, 757202252, 673866939, 673866939, 673866939, 673866939, 673866939, 673866939,
            681250366, 681250366, 681250366, 696709231, 696709231, 696709231, 696709231, 705224229,
            705224229, 709940593, 709940593, 709940593, 709940593, 734152057, 594196608, 594196608,
            594196608, 594196608, 594196608, 594196608, 594196608, 594196608, 594196608, 602978906,
            602978906, 602978906, 602978906, 602978906, 616905249, 616905249, 616905249, 637053749,
            637053749, 678503110, 678503110, 678503110, 678503110, 678503110, 678503110, 678503110,
            678503110, 736795357, 737528947, 737528947, 769548549, 769548549, 769548549, 769548549,
            769548549, 769548549, 769548549, 769548549, 769548549, 769548549, 769548549, 769548549,
            769548549, 769548549, 769548549, 769548549, 769548549, 769548549, 769548549, 848716948,
            848716948, 848716948, 848716948, 848716948, 848716948, 848716948, 973757043, 973757043,
            973757043, 973757043, 973757043, 973757043, 973757043, 973757043, 973757043, 973757043,
            973757043, 973757043, 973757043, 973757043, 1058909998, 1058909998, 1058909998,
            1210635569, 1239310947, 1239310947, 1239310947, 1268075425, 1268075425, 1304463901,
            1304463901, 1231995829, 1231995829, 1270950387, 1270950387, 1270950387, 1270950387,
            1270950387, 1270950387, 1270950387, 1270950387, 1300531616, 1295642992, 1295642992,
            1295642992, 1295642992, 1295642992, 1295642992, 1295642992, 1295642992, 1295642992,
            1295642992, 1295642992, 1295642992, 1352711599, 1352711599, 1352711599, 1352711599,
            1349031766, 1349031766, 1349031766, 1349031766, 1349031766, 1349031766, 1349031766,
            1349031766, 1349031766, 1367811094, 1367811094, 1367811094, 1367811094, 1367811094,
            1367811094, 1367811094, 1367811094, 1385096511, 1385096511, 1385096511, 1403982759,
            1403982759, 1403982759, 1403982759, 1403982759, 1403982759, 1403982759, 1403982759,
            1403982759, 1403982759, 1348027904,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 123498661, 155262842, 458223934, 516857732, 247086424, 698865453, 673866939,
            594196608, 769548549, 973757043, 1304463901, 1352711599, 1403982759,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [0, 458223934, 973757043],
          latestDate: 1733612400000,
        },
      },
      xpub: "503A8385F5BD71DDF0B0C0115DAE4B0DC0F08EF89F52C3B0CFD498706645889F",
    },
    {
      type: "Account",
      id: "mock:1:dogecoin:0.807651428430218:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "1HcgFNGTEtMrQ2op4ZgjtifdsvpTJ4",
      freshAddressPath: "44'/3'/0'/0/0",
      blockHeight: 128411,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 62,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "dogecoin",
        coinType: 3,
        name: "Dogecoin",
        managerAppName: "Dogecoin",
        ticker: "DOGE",
        scheme: "dogecoin",
        color: "#65d196",
        family: "bitcoin",
        blockAvgTime: 60,
        bitcoinLikeInfo: {
          P2PKH: 30,
          P2SH: 22,
          XPUBVersion: 49990397,
        },
        symbol: "Ð",
        units: [
          { name: "dogecoin", code: "DOGE", magnitude: 8 },
          { name: "satoshi", code: "sat", magnitude: 0 },
        ],
        explorerViews: [
          {
            tx: "https://dogechain.info/tx/$hash",
            address: "https://dogechain.info/address/$address",
          },
        ],
        keywords: ["doge", "dogecoin"],
        explorerId: "doge",
      },
      lastSyncDate: new Date("2024-12-11T09:54:35.262Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            9071428571427, 9071428571427, 8845306122448, 8845306122448, 8845306122448,
            8845306122448, 8845306122448, 8845306122448, 8845306122448, 8845306122448,
            8845306122448, 8845306122448, 8845306122448, 8845306122448, 8845306122448,
            8845306122448, 8845306122448, 6931428571428, 6931428571428, 6931428571428,
            6931428571428, 4454489795918, 4454489795918, 4454489795918, 4454489795918,
            4454489795918, 4454489795918, 6823469387754, 7044897959182, 7044897959182,
            7044897959182, 7044897959182, 7044897959182, 9663265306120, 9663265306120,
            16830612244895, 16830612244895, 16830612244895, 16830612244895, 16830612244895,
            18663061224486, 18663061224486, 19344081632649, 19344081632649, 21240408163261,
            21240408163261, 21240408163261, 24449795918363, 27900612244893, 27900612244893,
            27349795918363, 27349795918363, 27349795918363, 27349795918363, 25480204081629,
            25480204081629, 25480204081629, 25480204081629, 25480204081629, 28224897959180,
            30746326530608, 30606326530608, 30606326530608, 30207346938772, 30207346938772,
            30207346938772, 30207346938772, 30207346938772, 30207346938772, 30207346938772,
            30207346938772, 30207346938772, 22946530612242, 22946530612242, 22946530612242,
            22946530612242, 22946530612242, 22946530612242, 22946530612242, 22946530612242,
            22946530612242, 22946530612242, 22946530612242, 30633673469384, 30633673469384,
            30862857142853, 30862857142853, 30862857142853, 30862857142853, 30862857142853,
            30862857142853, 30875918367342, 30875918367342, 30875918367342, 30875918367342,
            30875918367342, 30875918367342, 30875918367342, 30875918367342, 30875918367342,
            30875918367342, 30875918367342, 29710816326525, 29710816326525, 25899183673464,
            25899183673464, 25899183673464, 23711836734688, 23711836734688, 23711836734688,
            23711836734688, 23711836734688, 23985714285708, 23985714285708, 23985714285708,
            23985714285708, 23985714285708, 23985714285708, 23807346938770, 23807346938770,
            23807346938770, 23807346938770, 25598979591831, 25598979591831, 25598979591831,
            25598979591831, 25598979591831, 25598979591831, 25598979591831, 25598979591831,
            25598979591831, 25473877551015, 25473877551015, 25473877551015, 25473877551015,
            25473877551015, 25503877551015, 25503877551015, 26764897959178, 26764897959178,
            26764897959178, 26905306122443, 26905306122443, 26905306122443, 26905306122443,
            26905306122443, 29148367346932, 29148367346932, 40093673469380, 37618163265299,
            37618163265299, 39562040816319, 39562040816319, 39562040816319, 39562040816319,
            39402653061217, 39402653061217, 39402653061217, 39402653061217, 39402653061217,
            39402653061217, 39402653061217, 39402653061217, 39402653061217, 39402653061217,
            51104489795910, 51104489795910, 51104489795910, 51104489795910, 51104489795910,
            51104489795910, 51104489795910, 51104489795910, 51104489795910, 51418367346930,
            51418367346930, 60991836734685, 60991836734685, 60991836734685, 60991836734685,
            67725714285705, 67725714285705, 67725714285705, 67725714285705, 69243265306113,
            69243265306113, 69243265306113, 69243265306113, 69243265306113, 70634489795908,
            70634489795908, 70634489795908, 70634489795908,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 3341224489795, 1280408163264, 8845306122448, 16830612244895, 30606326530608,
            30862857142853, 23711836734688, 25473877551015, 39402653061217, 67725714285705,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [0, 23711836734688],
          latestDate: 1733612400000,
        },
      },
      xpub: "6024CBE36F9E9250A3EF639F86A5B641F7CF324AEA4F9B205D0663CE68C84775",
    },
    {
      type: "Account",
      id: "mock:1:energy_web:0.37512881170687795:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "0xDF900A77A89ED58E513EBB053C0350935DC34D9C",
      freshAddressPath: "44'/60'/0'/0/0",
      blockHeight: 120593,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 95,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "energy_web",
        coinType: 60,
        name: "Energy Web",
        managerAppName: "Ethereum",
        ticker: "EWT",
        scheme: "energy_web",
        color: "#A566FF",
        family: "evm",
        units: [
          { name: "EWT", code: "EWT", magnitude: 18 },
          { name: "Gwei", code: "Gwei", magnitude: 9 },
          { name: "Mwei", code: "Mwei", magnitude: 6 },
          { name: "Kwei", code: "Kwei", magnitude: 3 },
          { name: "wei", code: "wei", magnitude: 0 },
        ],
        ethereumLikeInfo: { chainId: 246 },
        explorerViews: [
          {
            tx: "https://explorer.energyweb.org/tx/$hash",
            address: "https://explorer.energyweb.org/address/$address",
            token: "https://explorer.energyweb.org/token/$contractAddress?a=$address",
          },
        ],
      },
      lastSyncDate: new Date("2024-12-11T09:54:36.175Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            35424513, 35424513, 35424513, 36122031, 36122031, 36122031, 36122031, 36122031,
            36122031, 36122031, 36338157, 36338157, 36338157, 36338157, 36258770, 38126301,
            38126301, 38602217, 38602217, 38602217, 38602217, 38602217, 38602217, 38602217,
            38602217, 38602217, 38602217, 38602217, 38602217, 38602217, 38602217, 38602217,
            38602217, 44134183, 44240672, 45199075, 45199075, 45199075, 45199075, 45199075,
            45199075, 45199075, 45860595, 45689227, 45689227, 45689227, 45796537, 45796537,
            45796537, 45796537, 45796537, 45796537, 45796537, 45796537, 45796537, 45796537,
            45855941, 45855941, 45855941, 45855941, 45640225, 45640225, 46493097, 46493097,
            46493097, 46493097, 46493097, 46493097, 46493097, 46493097, 46493097, 46314201,
            50564737, 48829428, 44601475, 44601475, 44601475, 44601475, 44601475, 44891377,
            44415187, 44415187, 44774759, 44774759, 44774759, 44774759, 43763385, 43763385,
            43763385, 48322850, 48679548, 50486717, 50486717, 50486717, 50486717, 50486717,
            52679327, 52683022, 52683022, 52683022, 52683022, 52683022, 52683022, 52683022,
            52683022, 52683022, 52683022, 52683022, 53819637, 53819637, 53819637, 53819637,
            53819637, 52256791, 52256791, 52256791, 52256791, 52256791, 53383688, 53383688,
            53383688, 53383688, 51530392, 51530392, 51530392, 51530392, 51530392, 51530392,
            51530392, 52003434, 52003434, 52003434, 52003434, 52003434, 52003434, 52003434,
            52003434, 52003434, 52003434, 52003434, 52003434, 52003434, 52003434, 52003434,
            52840018, 52840018, 52840018, 52840018, 52840018, 52840018, 52840018, 50626876,
            50626876, 50626876, 50626876, 50320959, 52382717, 52382717, 52382717, 52382717,
            52382717, 52382717, 52382717, 52382717, 52382717, 52382717, 52382717, 52382717,
            54304315, 53269397, 53269397, 54692767, 54692767, 54692767, 54692767, 55541669,
            55541669, 55146509, 55146509, 55690726, 55690726, 55690726, 56302834, 50327253,
            50327253, 51084722, 51084722, 51084722, 51084722, 51084722, 51084722, 51084722,
            53587219,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 1097195, 20359569, 21945273, 27191988, 36075629, 36258770, 45199075, 46493097,
            43763385, 53819637, 52003434, 52382717, 56302834,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [0, 21945273, 53819637],
          latestDate: 1733612400000,
        },
      },
      xpub: "602FFC9EBDC4FBE203D2D9CB0FAE59C016D0636B0A96130DCDC60C7B368BE8AC",
    },
    {
      type: "Account",
      id: "mock:1:ethereum_classic:0.3802128410576043:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "0x79D7D3119D60CC666E0DE76AB3A1BFEE46001EAF",
      freshAddressPath: "44'/61'/0'/0/0",
      blockHeight: 132056,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 184,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "ethereum_classic",
        coinType: 61,
        name: "Ethereum Classic",
        managerAppName: "Ethereum Classic",
        ticker: "ETC",
        scheme: "ethereumclassic",
        color: "#3ca569",
        units: [
          { name: "ETC", code: "ETC", magnitude: 18 },
          { name: "Gwei", code: "Gwei", magnitude: 9 },
          { name: "Mwei", code: "Mwei", magnitude: 6 },
          { name: "Kwei", code: "Kwei", magnitude: 3 },
          { name: "wei", code: "wei", magnitude: 0 },
        ],
        family: "evm",
        blockAvgTime: 15,
        ethereumLikeInfo: { chainId: 61 },
        explorerViews: [
          {
            tx: "https://blockscout.com/etc/mainnet/tx/$hash/internal-transactions",
            address: "https://blockscout.com/etc/mainnet/address/$address/transactions",
          },
        ],
        keywords: ["etc", "ethereum classic"],
        explorerId: "etc",
      },
      lastSyncDate: new Date("2024-12-11T09:54:36.743Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            543975903614457800000, 548857104395234600000, 547624688698929800000,
            547624688698929800000, 548731910883758440000, 548731910883758440000,
            550494043211953900000, 577989499899037500000, 577989499899037500000,
            579767113145318700000, 579767113145318700000, 579767113145318700000,
            579767113145318700000, 579767113145318700000, 612192232617621300000,
            612192232617621300000, 612192232617621300000, 612192232617621300000,
            612192232617621300000, 612192232617621300000, 612192232617621300000,
            612192232617621300000, 612192232617621300000, 612192232617621300000,
            612192232617621300000, 625611496264387100000, 625611496264387100000,
            612320791546072500000, 612320791546072500000, 612320791546072500000,
            612320791546072500000, 612320791546072500000, 612320791546072500000,
            612320791546072500000, 612320791546072500000, 612320791546072500000,
            612320791546072500000, 612320791546072500000, 612320791546072500000,
            612320791546072500000, 623154068789123000000, 623154068789123000000,
            623154068789123000000, 623154068789123000000, 623154068789123000000,
            623154068789123000000, 623154068789123000000, 623154068789123000000,
            623154068789123000000, 623168203540418700000, 623168203540418700000,
            623168203540418700000, 623168203540418700000, 623168203540418700000,
            623168203540418700000, 623168203540418700000, 623168203540418700000,
            623168203540418700000, 623168203540418700000, 623168203540418700000,
            623168203540418700000, 623168203540418700000, 620924143501379800000,
            620924143501379800000, 620924143501379800000, 620924143501379800000,
            620924143501379800000, 620924143501379800000, 620924143501379800000,
            620924143501379800000, 620924143501379800000, 620924143501379800000,
            620924143501379800000, 620924143501379800000, 620924143501379800000,
            620924143501379800000, 620924143501379800000, 598105270242983000000,
            598105270242983000000, 598105270242983000000, 599209800094231700000,
            599209800094231700000, 599209800094231700000, 576554486100827900000,
            576554486100827900000, 576554486100827900000, 576554486100827900000,
            576554486100827900000, 608722487716228000000, 610216059769805500000,
            610216059769805500000, 610216059769805500000, 610216059769805500000,
            610216059769805500000, 614488120078077700000, 614488120078077700000,
            614488120078077700000, 616833815709766400000, 622637140741738000000,
            622637140741738000000, 622637140741738000000, 622637140741738000000,
            622637140741738000000, 618973547822575300000, 620446254290906600000,
            620446254290906600000, 620446254290906600000, 620446254290906600000,
            620446254290906600000, 620446254290906600000, 620446254290906600000,
            611590496062462100000, 611590496062462100000, 611590496062462100000,
            611590496062462100000, 611590496062462100000, 611590496062462100000,
            611590496062462100000, 611590496062462100000, 611590496062462100000,
            611590496062462100000, 611590496062462100000, 611590496062462100000,
            611590496062462100000, 615915056875546900000, 615915056875546900000,
            615915056875546900000, 615915056875546900000, 618478831527226200000,
            618714410715487700000, 618714410715487700000, 618714410715487700000,
            618714410715487700000, 618714410715487700000, 618714410715487700000,
            618714410715487700000, 618714410715487700000, 618714410715487700000,
            619450763949653400000, 618780372888200800000, 618780372888200800000,
            618780372888200800000, 618780372888200800000, 618780372888200800000,
            618780372888200800000, 618780372888200800000, 618780372888200800000,
            618780372888200800000, 618780372888200800000, 618780372888200800000,
            618780372888200800000, 618780372888200800000, 618780372888200800000,
            618780372888200800000, 618780372888200800000, 618780372888200800000,
            618780372888200800000, 621366359291916200000, 633420609813555800000,
            633420609813555800000, 633420609813555800000, 645895537457090900000,
            645895537457090900000, 645895537457090900000, 645895537457090900000,
            640096250925489600000, 660594332637813800000, 660594332637813800000,
            660594332637813800000, 660594332637813800000, 660594332637813800000,
            660594332637813800000, 660594332637813800000, 664733122433869500000,
            665034663794844100000, 665034663794844100000, 656816315541495600000,
            656816315541495600000, 656816315541495600000, 656816315541495600000,
            656816315541495600000, 656816315541495600000, 656816315541495600000,
            656816315541495600000, 656816315541495600000, 656816315541495600000,
            656816315541495600000, 656816315541495600000, 656816315541495600000,
            658904893316281900000, 660133270512216400000, 660133270512216400000,
            660133270512216400000,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 23390321060779430000, 68410177020932890000, 26644006192367230000,
            60639429225281000000, 121539341724439640000, 165781786363330400000,
            203335128222386750000, 265976980547889860000, 289407686612371240000,
            329510668371811240000, 413592919162684240000, 464141482129635800000,
            477792959547687960000, 458445177357474600000, 465155818805950000000,
            562590024904085600000, 552687621996365350000, 612192232617621300000,
            612320791546072500000, 620924143501379800000, 576554486100827900000,
            620446254290906600000, 618714410715487700000, 633420609813555800000,
            656816315541495600000,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [
            0, 23390321060779430000, 265976980547889860000, 465155818805950000000,
            620446254290906600000,
          ],
          latestDate: 1733612400000,
        },
      },
      xpub: "5CBDD12CE86122F06B9931625A5D18666643D2230AB62FE0D45E8BC08259559D",
    },
    {
      type: "Account",
      id: "mock:1:linea:0.03503010215576742:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "0xB0E1D3F5F8AC8E17109C286AC15C96FAED86C094",
      freshAddressPath: "44'/60'/0'/0/0",
      blockHeight: 175413,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 180,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "linea",
        coinType: 60,
        name: "Linea",
        managerAppName: "Ethereum",
        ticker: "ETH",
        scheme: "linea",
        color: "#000000",
        family: "evm",
        units: [
          { name: "ETH", code: "ETH", magnitude: 18 },
          { name: "Gwei", code: "Gwei", magnitude: 9 },
          { name: "Mwei", code: "Mwei", magnitude: 6 },
          { name: "Kwei", code: "Kwei", magnitude: 3 },
          { name: "wei", code: "wei", magnitude: 0 },
        ],
        disableCountervalue: false,
        ethereumLikeInfo: { chainId: 59144 },
        explorerViews: [
          {
            tx: "https://lineascan.build/tx/$hash",
            address: "https://lineascan.build/address/$address",
            token: "https://lineascan.build/token/$address",
          },
        ],
      },
      lastSyncDate: new Date("2024-12-11T09:54:36.635Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            51579808, 51579808, 51579808, 51579808, 51579808, 51579808, 53942965, 53942965,
            53942965, 50091147, 50091147, 50091147, 50091147, 50091147, 54178802, 49701052,
            45209887, 45493767, 45493767, 45493767, 50819599, 50819599, 50819599, 51466473,
            51466473, 51466473, 51466473, 51466473, 55992540, 55992540, 55992540, 55992540,
            55992540, 55992540, 55992540, 55992540, 55992540, 55992540, 55992540, 55992540,
            55992540, 55992540, 55992540, 55992540, 55992540, 55992540, 55992540, 55740005,
            55740005, 61429242, 61429242, 61429242, 61429242, 61429242, 61429242, 61429242,
            61429242, 61429242, 61429242, 61608275, 61608275, 55130360, 56421097, 56421097,
            56421097, 53576410, 53576410, 53576410, 53576410, 53576410, 53576410, 53576410,
            53576410, 53576410, 53576410, 53576410, 50422247, 51211198, 51211198, 53889991,
            47720868, 47720868, 47720868, 47720868, 47720868, 47720868, 47720868, 47720868,
            48879794, 49262498, 49262498, 49262498, 49262498, 49262498, 49262498, 49262498,
            49262498, 49262498, 49262498, 49262498, 49262498, 48300126, 48248798, 48248798,
            48248798, 48248798, 48248798, 48248798, 48248798, 48248798, 48248798, 48248798,
            48248798, 48248798, 48248798, 48248798, 48248798, 48919625, 48919625, 48919625,
            48919625, 48919625, 48919625, 48919625, 48919625, 48919625, 48919625, 52113345,
            52113345, 52113345, 52113345, 52113345, 52113345, 52113345, 53916955, 54248331,
            54248331, 54248331, 54248331, 54248331, 54248331, 54248331, 54248331, 54248331,
            54248331, 54248331, 54248331, 54248331, 58075238, 58075238, 65594777, 65594777,
            65682377, 65682377, 65682377, 65849091, 65849091, 65849091, 70860383, 70860383,
            70860383, 70860383, 70860383, 70860383, 70860383, 70860383, 71002049, 71002049,
            63886430, 63886430, 63886430, 63886430, 63008921, 63008921, 63008921, 63008921,
            63008921, 63008921, 63008921, 63008921, 63008921, 63008921, 63008921, 63008921,
            63008921, 62736128, 62736128, 62736128, 62736128, 62736128, 64237927, 64237927,
            64237927,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 3170451, 13226569, 13214111, 22720671, 21945408, 26887578, 30858477, 40549547,
            46441224, 45387692, 46033608, 40708322, 44409712, 31692595, 40116881, 41839598,
            45287084, 46027170, 41091981, 51090201, 37865960, 53026583, 54178802, 55992540,
            56421097, 47720868, 48248798, 53916955, 70860383, 63008921,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [0, 26887578, 44409712, 51090201, 48248798],
          latestDate: 1733612400000,
        },
      },
      xpub: "F57C96A272FAB0E47F8FD7E5A3F29C58F088A139927828A7AF8731E315099918",
    },
    {
      type: "Account",
      id: "mock:1:near:0.6709116415216639:",
      used: true,
      seedIdentifier: "mock",
      derivationMode: "",
      index: 1,
      freshAddress: "1aYQttd1RvLjJ3NXTNXgNMwhvfmRYMRt6z",
      freshAddressPath: "44'/397'/0'/0/0",
      blockHeight: 112715,
      creationDate: new Date("2024-11-13T12:20:06.444Z"),
      balance: BigNumber("83315786").multipliedBy(10),
      spendableBalance: BigNumber("83315786").multipliedBy(10),
      operations: [],
      operationsCount: 155,
      pendingOperations: [],
      currency: {
        type: "CryptoCurrency",
        id: "near",
        coinType: 397,
        name: "NEAR",
        managerAppName: "NEAR",
        ticker: "NEAR",
        scheme: "near",
        color: "#000",
        family: "near",
        units: [
          { name: "NEAR", code: "NEAR", magnitude: 24 },
          { name: "yoctoNEAR", code: "yoctoNEAR", magnitude: 0 },
        ],
        explorerViews: [
          {
            address: "https://nearblocks.io/address/$address",
            tx: "https://nearblocks.io/txns/$hash",
          },
        ],
        keywords: ["near"],
      },
      lastSyncDate: new Date("2024-12-11T09:54:36.635Z"),
      swapHistory: [],
      balanceHistoryCache: {
        HOUR: {
          balances: [
            66108332, 66108332, 66125304, 66125304, 66125304, 66125304, 66125304, 66125304,
            66125304, 66125304, 66125304, 66125304, 68454654, 68454654, 63429127, 63429127,
            58645596, 58399905, 58399905, 58399905, 58399905, 58467384, 58467384, 58467384,
            58467384, 58467384, 58467384, 62923508, 63569834, 63569834, 63569834, 63569834,
            63569834, 63569834, 63569834, 64161547, 65865375, 65865375, 66980774, 66980774,
            66980774, 66980774, 66980774, 66980774, 66980774, 66980774, 66980774, 66980774,
            66029215, 66029215, 65438597, 65438597, 65438597, 65438597, 65893708, 65681141,
            65681141, 72627170, 72587340, 72794432, 72794432, 72794432, 72794432, 72794432,
            72794432, 72794432, 72794432, 72794432, 72794432, 72794432, 72794432, 72794432,
            72794432, 72794432, 72794432, 72338226, 72338226, 72338226, 72338226, 72338226,
            72338226, 72338226, 72338226, 72338226, 72338226, 72338226, 72338226, 72338226,
            72338226, 72338226, 72338226, 72338226, 72338226, 72794843, 72794843, 69533507,
            69533507, 69328605, 69328605, 69328605, 69328605, 69328605, 69328605, 69328605,
            65070401, 65070401, 65070401, 65070401, 64801577, 66193602, 66193602, 66193602,
            66193602, 66193602, 66193602, 66193602, 66193602, 66193602, 66193602, 66193602,
            63635122, 63635122, 63635122, 63635122, 65806106, 66781071, 66781071, 66781071,
            66781071, 66781071, 66781071, 66781071, 74492100, 74492100, 74492100, 74492100,
            74492100, 74492100, 74492100, 74492100, 74492100, 74492100, 74492100, 74492100,
            74492100, 74492100, 74492100, 74492100, 74492100, 75952289, 76125710, 76125710,
            76125710, 76125710, 76125710, 76125710, 76125710, 76125710, 77349104, 77349104,
            77349104, 77349104, 77349104, 77349104, 77349104, 82814548, 82814548, 82814548,
            82821939, 82821939, 82821939, 82821939, 82821939, 82821939, 82643043, 82858895,
            82858895, 82858895, 82858895, 83315786, 83315786, 83315786, 83315786, 83315786,
            83315786, 83315786, 83315786, 83315786, 83315786, 83315786, 83315786, 83315786,
            83315786,
          ],
          latestDate: 1733907600000,
        },
        DAY: {
          balances: [
            0, 2294036, 23635414, 27645186, 34078342, 34660063, 44882483, 51299076, 53804171,
            49607425, 39470410, 38031574, 38838593, 45738359, 60004361, 63429127, 66980774,
            72794432, 72338226, 66193602, 74492100, 77349104, 83315786,
          ],
          latestDate: 1733871600000,
        },
        WEEK: {
          balances: [0, 34660063, 38838593, 66193602],
          latestDate: 1733612400000,
        },
      },
      xpub: "C2AC267866DDDC2D8D45040716FD3BD972DD182AA2F8D82E882FA42B10723165",
    },
  ],
};
