import { type FC } from "react";
import {
  Navigation,
  reactNavigationPathTransformerFactory,
} from "package--xp-navigation";
import type {
  StackKeys,
  ScreenProps,
} from "#navigators/root/Root.navigator.types.mts";

const WEB_APP_URL = process.env.WEB_APP_URL;

/**
 * @dev
 * 1- TODO type inconsistency between xp-navigation and react navigation
 */
// TODO this needs to work with full urls
Navigation.setPathTransformer(
  reactNavigationPathTransformerFactory(WEB_APP_URL, "home"),
);

type ScreenHoc = <T extends StackKeys>(
  Children: FC<ScreenProps<T>["route"]["params"]>,
) => FC<ScreenProps<T>>;

export const screenHoc: ScreenHoc = (Screen) => (props) => {
  Navigation.setHandlers({
    // @ts-expect-error: #1
    push: props.navigation.push,
  });

  return <Screen {...props.route.params!} />;
};
