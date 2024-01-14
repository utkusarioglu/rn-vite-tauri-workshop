import { CounterScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";

export const SpaCounterScreen = screenHoc((props) => (
  <CounterScreen {...props} />
));
