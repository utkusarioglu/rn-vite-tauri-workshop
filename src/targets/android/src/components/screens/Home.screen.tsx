import { ScreenWrapper } from "#wrappers/Screen.wrapper.tsx";
import { Button } from "react-native";
import { HomeScreen } from "xp-app/screens";
import { Navigation } from "xp-navigation";

export const AndroidHomeScreen = () => {
  return (
    <ScreenWrapper>
      <Button title="home" onPress={() => Navigation.push("/counter")} />
      <HomeScreen />
    </ScreenWrapper>
  );
};
