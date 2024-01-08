import { ScreenWrapper } from "#wrappers/Screen.wrapper.tsx";
import { Button } from "react-native";
import { HomeScreen } from "package--xp-app/screens";
import { Navigation } from "package--xp-navigation";

export const AndroidHomeScreen = () => {
  return (
    <ScreenWrapper>
      <Button title="home" onPress={() => Navigation.push("/counter")} />
      <HomeScreen />
    </ScreenWrapper>
  );
};
