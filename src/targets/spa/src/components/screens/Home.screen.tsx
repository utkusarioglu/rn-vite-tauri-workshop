import { HomeScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";

// export const SpaHomeScreen = () => (
//   <ScreenWrapper>
//     <HomeScreen />
//   </ScreenWrapper>
// );

export const SpaHomeScreen = screenHoc(HomeScreen);
