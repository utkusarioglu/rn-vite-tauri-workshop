import ReactDOMServer from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import ssrTamaguiConfig from "#/tamagui.config.mts";
import { ThemedApp } from "./ThemedApp.tsx";
import { NO_PAGE_ERROR } from "#/src/errors.mts";
import { parseSearchParams } from "package--url-parser";

/**
 * @dev
 * #1 Vike type issue, should be gone when pageContext types are defined
 */
export const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext,
): ReturnType<OnRenderHtmlAsync> => {
  const {
    Page,
    // @ts-expect-error
    pageProps,
    urlParsed: { searchOriginal },
  } = pageContext;

  if (!Page) {
    throw new Error(NO_PAGE_ERROR);
  }

  const props = parseSearchParams(
    pageProps,
    new URLSearchParams(searchOriginal || ""),
  );

  const pageHtml = ReactDOMServer.renderToString(
    <ThemedApp pageContext={pageContext} props={props} prefersDark={false} />,
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
        ...props,
      },
      // bunnies: "yes",
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  };
};
