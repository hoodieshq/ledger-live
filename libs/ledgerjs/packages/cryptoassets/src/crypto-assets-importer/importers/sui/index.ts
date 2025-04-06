import fs from "fs";
import path from "path";

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
    const suiTokens: SuiToken[] = [
      [
        "0x5aa8257984a7b0425872391967b8dd78e94275d4854aabeb6f4d7d5e724d9255::hoodies_token::HOODIES_TOKEN",
        "HOODIES_TOKEN",
        "HOODIES_TOKEN",
        "0x5aa8257984a7b0425872391967b8dd78e94275d4854aabeb6f4d7d5e724d9255::hoodies_token::HOODIES_TOKEN",
        6,
      ],
      [
        "0x40a47fcf45e73675f435f9990711ea444421654bf7f7dfa03ba142ba8f94c5d1::hoodies_token_9::HOODIES_TOKEN_9",
        "HOODIES_TOKEN",
        "HOODIES_TOKEN",
        "0x40a47fcf45e73675f435f9990711ea444421654bf7f7dfa03ba142ba8f94c5d1::hoodies_token_9::HOODIES_TOKEN_9",
        9,
      ],
    ];

    const filePath = path.join(outputDir, "sui");
    const suiTypeStringified = `export type SuiToken = [
  string, // CAL id
  string, // name
  string, // ticker
  string, // address
  number, // decimals
];`;

    fs.writeFileSync(`${filePath}.json`, JSON.stringify(suiTokens));

    fs.writeFileSync(
      `${filePath}.ts`,
      `${suiTypeStringified}

import tokens from "./sui.json";

export default tokens as SuiToken[];
`,
    );

    console.log("importing sui tokens sucess");
  } catch (err) {
    console.error(err);
  }
};
