import { createTamagui, tamaguiBaseConfig } from "elements";

const spaTamaguiConfig = createTamagui(tamaguiBaseConfig);

export type SpaTamaguiConfig = typeof spaTamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends SpaTamaguiConfig {}
}

export default spaTamaguiConfig;
