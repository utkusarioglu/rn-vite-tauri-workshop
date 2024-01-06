// https://vike.dev/onRenderClient
export { onRenderClient };

import { hydrateRoot } from "react-dom/client";
import { PageLayout } from "./PageLayout.tsx";
import type { OnRenderClientAsync } from "vike/types";
import { ElementsProvider } from "elements";
import ssrTamaguiConfig from "../../tamagui.config.mts";

/**
 * @dev
 * #1 Vike type issue, should be gone when pageContext types are defined
 */
const onRenderClient: OnRenderClientAsync = async (
  pageContext,
): ReturnType<OnRenderClientAsync> => {
  // @ts-expect-error: #1
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined",
    );
  const root = document.getElementById("react-root");
  if (!root) throw new Error("DOM element #react-root not found");

  const prefersDark = false;

  hydrateRoot(
    root,
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
    </ElementsProvider>,
  );
};
