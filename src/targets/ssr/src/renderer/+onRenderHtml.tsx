import "package--elements/css-reset";
import "#styles/index.css";
import ReactDOMServer from "react-dom/server";
import { PageLayout } from "./PageLayout.tsx";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { ElementsProvider } from "package--elements";
import ssrTamaguiConfig from "#/tamagui.config.mts";

/**
 * @dev
 * #1 Vike type issue, should be gone when pageContext types are defined
 */
export const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext,
): ReturnType<OnRenderHtmlAsync> => {
  // @ts-expect-error: #1
  const { Page, pageProps } = pageContext;
  // This onRenderHtml() hook only supports SSR, see https://vike.dev/render-modes for how to modify
  // onRenderHtml() to support SPA
  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");

  const prefersDark = false;

  const pageHtml = ReactDOMServer.renderToString(
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

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports;
  // @ts-expect-error: #1
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    // @ts-expect-error: #1
    (documentProps && documentProps.description) || "App using Vite + Vike";

  const tamaguiCss = ssrTamaguiConfig.getCSS();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <style>${dangerouslySkipEscape(tamaguiCss)}</style>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // @ts-expect-error
      pageProps: {
        // passToClient: true,
      },
      // bunnies: "yes",
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  };
};
