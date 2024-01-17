import { HomeScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";
import { ScreenLayout } from "#layouts/screen/Screen.layout.tsx";

export const LinuxHomeScreen = screenHoc(() => (
  <ScreenLayout>
    <HomeScreen />
  </ScreenLayout>
));
