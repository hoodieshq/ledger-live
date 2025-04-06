export type SuiToken = [
  string, // CAL id
  string, // name
  string, // ticker
  string, // address
  number, // decimals
];

import tokens from "./sui.json";

export default tokens as SuiToken[];
