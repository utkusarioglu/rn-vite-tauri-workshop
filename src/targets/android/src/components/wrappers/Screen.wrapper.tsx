import type { FC, PropsWithChildren } from "react";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "xp-navigation";

type ScreenWrapperProps = PropsWithChildren;

Navigation.setPathTransformer((path, options = {}) => {
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  if (!path.length) {
    return { path: "home", options };
  }

  return {
    path,
    options,
  };
});

export const ScreenWrapper: FC<ScreenWrapperProps> = ({ children }) => {
  const navigation = useNavigation();

  Navigation.setHandlers({
    push: navigation.push,
  });

  return <>{children}</>;
};
