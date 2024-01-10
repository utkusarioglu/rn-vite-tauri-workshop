import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "package--xp-navigation";

// TODO this needs to come from an environment variable or a config module.
// const WEB_APP_URL = "http://www.rn-vite-tauri-workshop.com";
const WEB_APP_URL = window.location.origin;

Navigation.setPathTransformer((rawPath, rawParams = {}) => {
  const url = new URL([WEB_APP_URL, rawPath].join(""));

  Object.entries(rawParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  console.log(url);

  return {
    path: url.pathname + url.search,
    params: {},
  };
});

type ScreenHoc = (Component: FC) => FC;

export const screenHoc: ScreenHoc = (Screen) => () => {
  const navigate = useNavigate();

  Navigation.setHandlers({
    push: navigate,
  });

  const url = new URL(window.location.href);
  const searchParams: any = {};
  for (const [key, val] of url.searchParams.entries()) {
    searchParams[key] = val;
  }

  return <Screen {...searchParams} />;
};
