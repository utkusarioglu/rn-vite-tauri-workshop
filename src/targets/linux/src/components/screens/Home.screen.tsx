import { HomeScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";
import { PageLayout } from "../layouts/screen/Page.layout.tsx";

export const LinuxHomeScreen = screenHoc(() => (
  <PageLayout>
    <HomeScreen />
  </PageLayout>
));
