import { ScreenLayout } from "#layouts/screen/Screen.layout.tsx";
import { HomeScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";

export const SpaHomeScreen = screenHoc(() => (
  <ScreenLayout>
    <HomeScreen />
  </ScreenLayout>
));
