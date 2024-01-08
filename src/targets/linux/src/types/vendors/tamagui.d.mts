import type { linuxTamaguiConfig } from "#/tamagui.config.mts";

export type LinuxTamaguiConfig = typeof linuxTamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends LinuxTamaguiConfig {}
}
