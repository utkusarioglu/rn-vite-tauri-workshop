import "package--elements/css-reset";
import "#styles/index.css";
import type { FC } from "react";
import ssrTamaguiConfig from "#/tamagui.config.mts";
import { ElementsProvider } from "package--elements";
import { PageLayout } from "./PageLayout.tsx";

interface ThemedAppProps {
  pageContext: any;
  props: Record<string, any>;
  prefersDark: boolean;
}
export const ThemedApp: FC<ThemedAppProps> = ({
  pageContext,
  props: pageProps,
  prefersDark,
}) => (
  <ElementsProvider
    config={ssrTamaguiConfig}
    /* @ts-expect-error: #1 */
    defaultTheme={prefersDark ? "dark" : "light"}
    disableInjectCSS
    disableRootThemeClass
  >
    <PageLayout pageContext={pageContext}>
      <pageContext.Page {...pageProps} />
    </PageLayout>
  </ElementsProvider>
);
