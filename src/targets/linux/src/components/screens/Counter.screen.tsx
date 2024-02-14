import { ScreenLayout } from "#layouts/screen/Screen.layout.tsx";
import { CounterScreen } from "package--xp-app/screens";
import { screenHoc } from "#hocs/Screen.hoc.tsx";

/**
 * @notes
 * 1. TODO Error comes from `screenHoc` not knowing about the props of the screen
 * component. The component expects `initialValue` prop but `screenHoc` thinks
 * that it's offering `{}`. This can be resolved by making `screenHoc` aware of
 * the props of its child through generics or some other means.
 * Note that the same issue also appears in `linux` distro.
 */
export const LinuxCounterScreen = screenHoc((props) => (
  <ScreenLayout>
    {/* @ts-expect-error: #1 */}
    <CounterScreen {...props} />
  </ScreenLayout>
));
