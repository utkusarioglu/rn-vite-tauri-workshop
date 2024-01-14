import type { Root } from "react-dom/client";
import { createRoot, hydrateRoot } from "react-dom/client";
import { navigate } from "vike/client/router";
import type { OnRenderClientAsync } from "vike/types";
import { Navigation, browserPathTransformer } from "package--xp-navigation";
import { ThemedApp } from "./ThemedApp.tsx";
import { NO_PAGE_ERROR, NO_CONTAINER_ERROR } from "#/src/errors.mts";
import { parseSearchParams } from "package--url-parser";

Navigation.setPathTransformer(browserPathTransformer);
Navigation.setHandlers({
  push: navigate,
});

let root: Root | undefined;

/**
 * @dev
 * #1 Vike type issue, should be gone when pageContext types are defined
 */
export const onRenderClient: OnRenderClientAsync = async (
  pageContext,
): ReturnType<OnRenderClientAsync> => {
  const {
    Page,
    // @ts-expect-error
    pageProps,
    // routeParams,
    urlParsed: { searchOriginal, hash },
  } = pageContext;

  if (!Page) {
    throw new Error(NO_PAGE_ERROR);
  }

  const props = {
    ...parseSearchParams(
      pageProps,
      new URLSearchParams(searchOriginal || ""),
      "ignore",
    ),
    hash,
  };

  const container = document.getElementById("react-root");
  if (!container) {
    throw new Error(NO_CONTAINER_ERROR);
  }

  const component = (
    <ThemedApp pageContext={pageContext} props={props} prefersDark={false} />
  );

  if (container.innerHTML === "" || !pageContext.isHydration) {
    if (!root) {
      root = createRoot(container);
    }
    root.render(component);
  } else {
    root = hydrateRoot(container, component);
  }
};
