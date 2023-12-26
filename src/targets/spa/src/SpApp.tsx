import { XpApp } from "xp-app";
import spaTamaguiConfig from "../tamagui.config.mjs";
import { ElementsProvider } from "elements";

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export const SpApp = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <ElementsProvider
      config={spaTamaguiConfig}
      /* @ts-expect-error: #1 */
      defaultTheme={prefersDark ? "dark" : "light"}
      disableRootThemeClass
    >
      <XpApp />
    </ElementsProvider>
  );
};
