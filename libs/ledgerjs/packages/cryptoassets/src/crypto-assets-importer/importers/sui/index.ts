import fs from "fs";
import path from "path";
// import { fetchTokensFromCALService } from "../../fetch";

type SuiToken = [
  string, // CAL id
  string, // name
  string, // ticker
  string, // address
  number, // decimals
];

export const importSuiTokens = async (outputDir: string) => {
  try {
    console.log("importing sui tokens...");
    const hash = `W/"3843292ad4df0bf36406b432de22d7d3ec5fd7e5"`;
    const tokens = [
      {
        id: "sui/coin/aaa_cat_0xd976fda9a9786cda1a36dee360013d775a5e5f206f8e20f84fad3385e99eeb2d::aaa::aaa",
        contract_address:
          "0xd976fda9a9786cda1a36dee360013d775a5e5f206f8e20f84fad3385e99eeb2d::aaa::AAA",
        decimals: 6,
        name: "aaa cat",
        ticker: "AAA",
      },
      {
        id: "sui/coin/afsui_0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::afsui",
        contract_address:
          "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
        decimals: 9,
        name: "afSUI",
        ticker: "AFSUI",
      },
      {
        id: "sui/coin/agent_s_0xea65bb5a79ff34ca83e2995f9ff6edd0887b08da9b45bf2e31f930d3efb82866::s::s",
        contract_address:
          "0xea65bb5a79ff34ca83e2995f9ff6edd0887b08da9b45bf2e31f930d3efb82866::s::S",
        decimals: 9,
        name: "Agent S",
        ticker: "S",
      },
      {
        id: "sui/coin/alphafi_staked_sui_0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::stsui",
        contract_address:
          "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
        decimals: 9,
        name: "AlphaFi Staked SUI",
        ticker: "stSUI",
      },
      {
        id: "sui/coin/alpha_token_0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::alpha",
        contract_address:
          "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",
        decimals: 9,
        name: "ALPHA Token",
        ticker: "ALPHA",
      },
      {
        id: "sui/coin/ausd_0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::ausd",
        contract_address:
          "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
        decimals: 6,
        name: "AUSD",
        ticker: "AUSD",
      },
      {
        id: "sui/coin/axol_0xae00e078a46616bf6e1e6fb673d18dcd2aa31319a07c9bc92f6063363f597b4e::axol::axol",
        contract_address:
          "0xae00e078a46616bf6e1e6fb673d18dcd2aa31319a07c9bc92f6063363f597b4e::AXOL::AXOL",
        decimals: 9,
        name: "AXOL",
        ticker: "AXOL",
      },
      {
        id: "sui/coin/blub_0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::blub::blub",
        contract_address:
          "0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB",
        decimals: 2,
        name: "BLUB",
        ticker: "BLUB",
      },
      {
        id: "sui/coin/bluefin_0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::blue",
        contract_address:
          "0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE",
        decimals: 9,
        name: "Bluefin",
        ticker: "BLUE",
      },
      {
        id: "sui/coin/bucket_token_0xbc858cb910b9914bee64fff0f9b38855355a040c49155a17b265d9086d256545::but::but",
        contract_address:
          "0xbc858cb910b9914bee64fff0f9b38855355a040c49155a17b265d9086d256545::but::BUT",
        decimals: 9,
        name: "Bucket Token",
        ticker: "BUT",
      },
      {
        id: "sui/coin/bucket_usd_0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::buck",
        contract_address:
          "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
        decimals: 9,
        name: "Bucket USD",
        ticker: "BUCK",
      },
      {
        id: "sui/coin/cetus_token_0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::cetus",
        contract_address:
          "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
        decimals: 9,
        name: "Cetus Token",
        ticker: "CETUS",
      },
      {
        id: "sui/coin/deepbook_token_0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::deep",
        contract_address:
          "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP",
        decimals: 6,
        name: "DeepBook Token",
        ticker: "DEEP",
      },
      {
        id: "sui/coin/eth_by_sui_bridge_0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::eth",
        contract_address:
          "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH",
        decimals: 8,
        name: "ETH by Sui Bridge",
        ticker: "ETH",
      },
      {
        id: "sui/coin/first_digital_usd_0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a::fdusd::fdusd",
        contract_address:
          "0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a::fdusd::FDUSD",
        decimals: 6,
        name: "First Digital USD",
        ticker: "FDUSD",
      },
      {
        id: "sui/coin/flowx_0x6dae8ca14311574fdfe555524ea48558e3d1360d1607d1c7f98af867e3b7976c::flx::flx",
        contract_address:
          "0x6dae8ca14311574fdfe555524ea48558e3d1360d1607d1c7f98af867e3b7976c::flx::FLX",
        decimals: 8,
        name: "FlowX",
        ticker: "FLX",
      },
      {
        id: "sui/coin/fud_0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::fud",
        contract_address:
          "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
        decimals: 5,
        name: "FUD",
        ticker: "FUD",
      },
      {
        id: "sui/coin/hasui_0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::hasui",
        contract_address:
          "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
        decimals: 9,
        name: "haSUI",
        ticker: "haSUI",
      },
      {
        id: "sui/coin/lofi_0xf22da9a24ad027cccb5f2d496cbe91de953d363513db08a3a734d361c7c17503::lofi::lofi",
        contract_address:
          "0xf22da9a24ad027cccb5f2d496cbe91de953d363513db08a3a734d361c7c17503::LOFI::LOFI",
        decimals: 9,
        name: "LOFI",
        ticker: "LOFI",
      },
      {
        id: "sui/coin/memefi_0x506a6fc25f1c7d52ceb06ea44a3114c9380f8e2029b4356019822f248b49e411::memefi::memefi",
        contract_address:
          "0x506a6fc25f1c7d52ceb06ea44a3114c9380f8e2029b4356019822f248b49e411::memefi::MEMEFI",
        decimals: 9,
        name: "MEMEFI",
        ticker: "MEMEFI",
      },
      {
        id: "sui/coin/miu_0x32a976482bf4154961bf20bfa3567a80122fdf8e8f8b28d752b609d8640f7846::miu::miu",
        contract_address:
          "0x32a976482bf4154961bf20bfa3567a80122fdf8e8f8b28d752b609d8640f7846::miu::MIU",
        decimals: 3,
        name: "MIU",
        ticker: "MIU",
      },
      {
        id: "sui/coin/mochi_0xa26788cb462ae9242d9483bdbe5a82188ba0eaeae3c5e9237d30cbcb83ce7a88::mochi::mochi",
        contract_address:
          "0xa26788cb462ae9242d9483bdbe5a82188ba0eaeae3c5e9237d30cbcb83ce7a88::mochi::MOCHI",
        decimals: 6,
        name: "Mochi",
        ticker: "MOCHI",
      },
      {
        id: "sui/coin/msend_series_1_0xda097d57ae887fbd002fb5847dd0ab47ae7e1b183fd36832a51182c52257e1bc::msend_series_1::msend_series_1",
        contract_address:
          "0xda097d57ae887fbd002fb5847dd0ab47ae7e1b183fd36832a51182c52257e1bc::msend_series_1::MSEND_SERIES_1",
        decimals: 6,
        name: "mSEND Series 1",
        ticker: "mSEND",
      },
      {
        id: "sui/coin/musd_0xe44df51c0b21a27ab915fa1fe2ca610cd3eaa6d9666fe5e62b988bf7f0bd8722::musd::musd",
        contract_address:
          "0xe44df51c0b21a27ab915fa1fe2ca610cd3eaa6d9666fe5e62b988bf7f0bd8722::musd::MUSD",
        decimals: 9,
        name: "mUSD",
        ticker: "mUSD",
      },
      {
        id: "sui/coin/navx_token_0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::navx",
        contract_address:
          "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
        decimals: 9,
        name: "NAVX Token",
        ticker: "NAVX",
      },
      {
        id: "sui/coin/ocean_token_0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9::ocean::ocean",
        contract_address:
          "0xa8816d3a6e3136e86bc2873b1f94a15cadc8af2703c075f2d546c2ae367f4df9::ocean::OCEAN",
        decimals: 9,
        name: "Ocean Token",
        ticker: "OCEAN",
      },
      {
        id: "sui/coin/ondo_us_dollar_yield_0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb::usdy::usdy",
        contract_address:
          "0x960b531667636f39e85867775f52f6b1f220a058c4de786905bdf761e06a56bb::usdy::USDY",
        decimals: 6,
        name: "Ondo US Dollar Yield",
        ticker: "USDY",
      },
      {
        id: "sui/coin/pepe_on_sui_0x288710173f12f677ac38b0c2b764a0fea8108cb5e32059c3dd8f650d65e2cb25::pepe::pepe",
        contract_address:
          "0x288710173f12f677ac38b0c2b764a0fea8108cb5e32059c3dd8f650d65e2cb25::pepe::PEPE",
        decimals: 2,
        name: "Pepe on Sui",
        ticker: "PEPE",
      },
      {
        id: "sui/coin/pyth_network_0x9c6d76eb273e6b5ba2ec8d708b7fa336a5531f6be59f326b5be8d4d8b12348a4::coin::coin",
        contract_address:
          "0x9c6d76eb273e6b5ba2ec8d708b7fa336a5531f6be59f326b5be8d4d8b12348a4::coin::COIN",
        decimals: 6,
        name: "Pyth Network",
        ticker: "PYTH",
      },
      {
        id: "sui/coin/scallop_0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::sca",
        contract_address:
          "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
        decimals: 9,
        name: "Scallop",
        ticker: "SCA",
      },
      {
        id: "sui/coin/send_0xb45fcfcc2cc07ce0702cc2d229621e046c906ef14d9b25e8e4d25f6e8763fef7::send::send",
        contract_address:
          "0xb45fcfcc2cc07ce0702cc2d229621e046c906ef14d9b25e8e4d25f6e8763fef7::send::SEND",
        decimals: 6,
        name: "SEND",
        ticker: "SEND",
      },
      {
        id: "sui/coin/spring_sui_0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::spring_sui",
        contract_address:
          "0x83556891f4a0f233ce7b05cfe7f957d4020492a34f5405b2cb9377d060bef4bf::spring_sui::SPRING_SUI",
        decimals: 9,
        name: "Spring SUI",
        ticker: "sSUI",
      },
      {
        id: "sui/coin/sudeng_0x8993129d72e733985f7f1a00396cbd055bad6f817fee36576ce483c8bbb8b87b::sudeng::sudeng",
        contract_address:
          "0x8993129d72e733985f7f1a00396cbd055bad6f817fee36576ce483c8bbb8b87b::sudeng::SUDENG",
        decimals: 9,
        name: "sudeng",
        ticker: "HIPPO",
      },
      {
        id: "sui/coin/suiai_0xbc732bc5f1e9a9f4bdf4c0672ee538dbf56c161afe04ff1de2176efabdf41f92::suai::suai",
        contract_address:
          "0xbc732bc5f1e9a9f4bdf4c0672ee538dbf56c161afe04ff1de2176efabdf41f92::suai::SUAI",
        decimals: 6,
        name: "SuiAI",
        ticker: "SUAI",
      },
      {
        id: "sui/coin/suins_token_0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::ns",
        contract_address:
          "0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS",
        decimals: 6,
        name: "SuiNS Token",
        ticker: "NS",
      },
      {
        id: "sui/coin/tardi_0x4cf08813756dfa7519cb480a1a1a3472b5b4ec067592a8bee0f826808d218158::tardi::tardi",
        contract_address:
          "0x4cf08813756dfa7519cb480a1a1a3472b5b4ec067592a8bee0f826808d218158::tardi::TARDI",
        decimals: 9,
        name: "Tardi",
        ticker: "TARDI",
      },
      {
        id: "sui/coin/tether_0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068::usdt::usdt",
        contract_address:
          "0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068::usdt::USDT",
        decimals: 6,
        name: "Tether",
        ticker: "USDT",
      },
      {
        id: "sui/coin/tether_usd_0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::coin",
        contract_address:
          "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
        decimals: 6,
        name: "Tether USD",
        ticker: "USDT",
      },
      {
        id: "sui/coin/tubbi_0x06106c04a586f0f003fcdf7fb33564f373680ddcc1beb716fd22e2952e227eb3::tubbi::tubbi",
        contract_address:
          "0x06106c04a586f0f003fcdf7fb33564f373680ddcc1beb716fd22e2952e227eb3::tubbi::TUBBI",
        decimals: 9,
        name: "TUBBI",
        ticker: "TUBBI",
      },
      {
        id: "sui/coin/turbos_0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::turbos",
        contract_address:
          "0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS",
        decimals: 9,
        name: "Turbos",
        ticker: "TURBOS",
      },
      {
        id: "sui/coin/usdc_0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::usdc",
        contract_address:
          "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
        decimals: 6,
        name: "USDC",
        ticker: "USDC",
      },
      {
        id: "sui/coin/usd_coin_0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::coin",
        contract_address:
          "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
        decimals: 6,
        name: "USD Coin",
        ticker: "USDC",
      },
      {
        id: "sui/coin/volo_staked_sui_0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::cert",
        contract_address:
          "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
        decimals: 9,
        name: "Volo Staked SUI",
        ticker: "vSUI",
      },
      {
        id: "sui/coin/wewe_0xb5b603827d1bfb2859200fd332d5e139ccac2598f0625de153a87cf78954e0c4::wewe::wewe",
        contract_address:
          "0xb5b603827d1bfb2859200fd332d5e139ccac2598f0625de153a87cf78954e0c4::wewe::WEWE",
        decimals: 9,
        name: "WEWE",
        ticker: "WEWE",
      },
      {
        id: "sui/coin/win_0xe6b9e1033c72084ad01db37c77778ca53b9c4ebb263f28ffbfed39f4d5fd5057::win::win",
        contract_address:
          "0xe6b9e1033c72084ad01db37c77778ca53b9c4ebb263f28ffbfed39f4d5fd5057::win::WIN",
        decimals: 9,
        name: "Win",
        ticker: "WIN",
      },
      {
        id: "sui/coin/wrapped_bitcoin_0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::btc",
        contract_address:
          "0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC",
        decimals: 8,
        name: "Wrapped Bitcoin",
        ticker: "wBTC",
      },
      {
        id: "sui/coin/wrapped_btc_0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::coin",
        contract_address:
          "0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN",
        decimals: 8,
        name: "Wrapped BTC",
        ticker: "WBTC",
      },
      {
        id: "sui/coin/wrapped_ether_0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::coin",
        contract_address:
          "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
        decimals: 8,
        name: "Wrapped Ether",
        ticker: "WETH",
      },
      {
        id: "sui/coin/wrapped_sol_0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::coin",
        contract_address:
          "0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN",
        decimals: 8,
        name: "Wrapped SOL",
        ticker: "SOL",
      },
    ];
    // const { tokens, hash } = await fetchTokensFromCALService({ blockchain_name: "sui" }, [
    //   "id",
    //   "name",
    //   "ticker",
    //   "contract_address",
    //   "decimals",
    // ]);
    const suiTokens: SuiToken[] = tokens.map(token => [
      token.id,
      token.name,
      token.ticker,
      token.contract_address,
      token.decimals,
    ]);
    const suiTokensDev: SuiToken[] = [
      [
        "0x5aa8257984a7b0425872391967b8dd78e94275d4854aabeb6f4d7d5e724d9255::hoodies_token::HOODIES_TOKEN",
        "HOODIES_TOKEN",
        "HDS",
        "0x5aa8257984a7b0425872391967b8dd78e94275d4854aabeb6f4d7d5e724d9255::hoodies_token::HOODIES_TOKEN",
        6,
      ],
      [
        "0x40a47fcf45e73675f435f9990711ea444421654bf7f7dfa03ba142ba8f94c5d1::hoodies_token_9::HOODIES_TOKEN_9",
        "HOODIES_TOKEN-9",
        "HDS-9",
        "0x40a47fcf45e73675f435f9990711ea444421654bf7f7dfa03ba142ba8f94c5d1::hoodies_token_9::HOODIES_TOKEN_9",
        9,
      ],
    ];
    suiTokens.push(...suiTokensDev);

    const filePath = path.join(outputDir, "sui");
    const suiTypeStringified = `export type SuiToken = [
  string, // CAL id
  string, // name
  string, // ticker
  string, // address
  number, // decimals
];`;

    fs.writeFileSync(`${filePath}.json`, JSON.stringify(suiTokens));
    if (hash) {
      fs.writeFileSync(`${filePath}-hash.json`, JSON.stringify(hash));
    }

    fs.writeFileSync(
      `${filePath}.ts`,
      `${suiTypeStringified}

import tokens from "./sui.json";

${hash ? `export { default as hash } from "./sui-hash.json";` : ""}

export default tokens as SuiToken[];
`,
    );

    console.log("importing sui tokens sucess");
  } catch (err) {
    console.error(err);
  }
};
