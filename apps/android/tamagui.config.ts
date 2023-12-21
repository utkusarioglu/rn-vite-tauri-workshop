import {createTamagui, tamaguiBaseConfig} from "elements";

const androidTamaguiConfig = createTamagui(tamaguiBaseConfig);

export type AndroidTamaguiConfig = typeof androidTamaguiConfig;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AndroidTamaguiConfig {}
}

export default androidTamaguiConfig;
