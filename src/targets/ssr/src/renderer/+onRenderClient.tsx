import ssrTamaguiConfig from "#/tamagui.config.mts";
import type { Root } from "react-dom/client";
import { createRoot, hydrateRoot } from "react-dom/client";
import { navigate } from "vike/client/router";
import type { OnRenderClientAsync } from "vike/types";
import { ElementsProvider } from "package--elements";
import { Navigation } from "package--xp-navigation";
import { PageLayout } from "./PageLayout.tsx";

Navigation.setPathTransformer((path, options = {}) => ({ path, options }));
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
  // @ts-expect-error: #1
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined",
    );
  const container = document.getElementById("react-root");
  if (!container) throw new Error("DOM element #react-root not found");

  const prefersDark = false;

  const component = (
    <ElementsProvider
      config={ssrTamaguiConfig}
      /* @ts-expect-error: #1 */
      defaultTheme={prefersDark ? "dark" : "light"}
      disableInjectCSS
      disableRootThemeClass
    >
      <PageLayout pageContext={pageContext}>
        {/* @ts-expect-error: #1 */}
        <Page {...pageProps} />
      </PageLayout>
    </ElementsProvider>
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
