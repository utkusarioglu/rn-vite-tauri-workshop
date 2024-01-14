import { ScreenLayout } from "#layouts/screen/Screen.layout.tsx";
import { CounterScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";

export const LinuxCounterScreen = screenHoc((props) => (
  <ScreenLayout>
    <CounterScreen {...props} />
  </ScreenLayout>
));
