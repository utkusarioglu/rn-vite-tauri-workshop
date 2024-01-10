// import type { FC } from "react";
// import type { ScreenProps } from "#navigators/root/Root.navigator.types.mjs";
import { Navigation } from "package--xp-navigation";
import { screenHoc } from "#hocs/Screen.hoc.tsx";
import { Button } from "react-native";
import { CounterScreen } from "package--xp-app/screens";

// export const AndroidCounterScreen: FC<ScreenProps<"counter">> = () => {
//   return (
//     <ScreenWrapper>
//     </ScreenWrapper>
//   );
// };

export const AndroidCounterScreen = screenHoc<"counter">(({ initialValue }) => (
  <>
    <Button title="home" onPress={() => Navigation.push("/")} />
    <CounterScreen initialValue={initialValue} />
  </>
));
