import { screenHoc } from "#hocs/Screen.hoc.tsx";
import { HomeScreen } from "package--xp-app/screens";
import { Navigation } from "package--xp-navigation";
import { Button } from "react-native";

export const AndroidHomeScreen = screenHoc<"home">(() => (
  <>
    <Button
      title="Counter"
      onPress={() =>
        Navigation.push("/counter?initialValue=67&cat-eats=bunny#bunnies")
      }
    />
    <HomeScreen />
  </>
));
