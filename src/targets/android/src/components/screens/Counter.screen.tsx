import { Navigation } from "package--xp-navigation";
import { screenHoc } from "#hocs/Screen.hoc.tsx";
import { Button } from "react-native";
import { CounterScreen } from "package--xp-app/screens";

export const AndroidCounterScreen = screenHoc<"counter">((props) => (
  <>
    <Button title="home" onPress={() => Navigation.push("/")} />
    <CounterScreen {...props} />
  </>
));
