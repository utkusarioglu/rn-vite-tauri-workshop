import { config } from "@tamagui/config/v2";
import { createTamagui } from "@tamagui/core";

const tamaguiBaseConfig = {
  ...config,
};

const spaTamaguiConfig = createTamagui(tamaguiBaseConfig);

export type SpaTamaguiConfig = typeof spaTamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends SpaTamaguiConfig {}
}

export default spaTamaguiConfig;
