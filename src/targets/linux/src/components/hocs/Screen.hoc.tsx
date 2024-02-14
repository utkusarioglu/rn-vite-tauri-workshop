import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, browserPathTransformer } from "package--xp-navigation";
import { parseHrefParamsAsObject } from "package--url-parser";

Navigation.setPathTransformer(browserPathTransformer);

type ScreenHoc = (Component: FC) => FC;

export const screenHoc: ScreenHoc = (Screen) => () => {
  const navigate = useNavigate();

  Navigation.setHandlers({
    push: navigate,
  });
  const props = parseHrefParamsAsObject(window.location.href, {}, "throw");

  return <Screen {...props} />;
};
