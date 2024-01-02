import { HomeScreen } from "xp-app/screens";
import linuxTamaguiConfig from "../tamagui.config.mts";
import { ElementsProvider } from "elements";

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export const LinuxApp = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <ElementsProvider
      config={linuxTamaguiConfig}
      /* @ts-expect-error: #1*/
      defaultTheme={prefersDark ? "dark" : "light"}
      disableRootThemeClass
    >
      <HomeScreen />
    </ElementsProvider>
  );
};
