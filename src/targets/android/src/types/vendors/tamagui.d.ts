import type { androidTamaguiConfig } from "#/tamagui.config.mts";

export type AndroidTamaguiConfig = typeof androidTamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AndroidTamaguiConfig {}
}
