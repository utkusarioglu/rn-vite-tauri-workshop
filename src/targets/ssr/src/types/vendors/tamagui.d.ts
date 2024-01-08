import type { spaTamaguiConfig } from "#/tamagui.config.mts";

export type SpaTamaguiConfig = typeof spaTamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends SpaTamaguiConfig {}
}
