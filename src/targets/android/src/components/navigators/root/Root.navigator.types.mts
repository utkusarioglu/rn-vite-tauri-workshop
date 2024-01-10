import type { CounterScreenProps } from "package--xp-app/screens";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  // counter: {
  //   start: number;
  // };
  counter: CounterScreenProps;
  home: undefined;
};

export type ScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;

export type StackKeys = keyof RootStackParamList;
