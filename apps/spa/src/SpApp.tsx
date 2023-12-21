import { XpApp } from "xp-app";
import spaTamaguiConfig from "../tamagui.config";
import { ElementsProvider } from "elements";

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export const SpApp = () => {
  return (
    /* @ts-ignore #1*/
    <ElementsProvider config={spaTamaguiConfig}>
      <XpApp />
    </ElementsProvider>
  );
};
