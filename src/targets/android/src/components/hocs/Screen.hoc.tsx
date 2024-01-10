import { type FC } from "react";
import { Navigation } from "package--xp-navigation";
import type {
  StackKeys,
  ScreenProps,
} from "#navigators/root/Root.navigator.types.mts";

Navigation.setPathTransformer((path, params = {}) => {
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  if (!path.length) {
    return { path: "home", params };
  }

  return {
    path,
    params,
  };
});

type ScreenHoc = <T extends StackKeys>(
  Children: FC<ScreenProps<T>["route"]["params"]>,
) => FC<ScreenProps<T>>;

export const screenHoc: ScreenHoc = (Screen) => (props) => {
  console.log({ params: props.route });
  Navigation.setHandlers({
    push: props.navigation.push,
  });

  return <Screen {...props.route.params!} />;
};
