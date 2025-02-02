import React from "react";
import { palettes } from "@ledgerhq/ui-shared";
import { FontProvider, Main } from "../storybook/stories/CenterView";
import { useDarkMode } from "storybook-dark-mode";
import { StyleProvider } from "../src/styles/StyleProvider";

export const decorators = [
  (Story) => {
    const theme = useDarkMode() ? "dark" : "light";
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}
      >
        <style>
          {
            `body { padding: 0!important;}
          *:focus, *:active {
            outline: none !important;
          }` /* outline custom styling used to mask focus boxes on safari & chrome */
          }
        </style>
        <StyleProvider selectedPalette={theme}>
          <FontProvider>
            <Main>
              <Story />
            </Main>
          </FontProvider>
        </StyleProvider>
      </div>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: palettes.light.background.main,
      },
      {
        name: "dark",
        value: palettes.dark.background.main,
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
