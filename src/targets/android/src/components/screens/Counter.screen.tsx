import { Navigation } from "xp-navigation";
import { ScreenWrapper } from "#wrappers/Screen.wrapper.tsx";
import { Button } from "react-native";
import { CounterScreen } from "xp-app/screens";

export const AndroidCounterScreen = () => {
  return (
    <ScreenWrapper>
      <Button title="home" onPress={() => Navigation.push("/")} />
      <CounterScreen />
    </ScreenWrapper>
  );
};
