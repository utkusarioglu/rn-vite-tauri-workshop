import "package--elements/css-reset";
import "#styles/index.css";
import type { FC } from "react";
import ssrTamaguiConfig from "#/tamagui.config.mts";
import { ElementsProvider } from "package--elements";
import { ScreenLayout } from "#layouts/screen/Screen.layout.tsx";

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
    <ScreenLayout pageContext={pageContext}>
      <pageContext.Page {...pageProps} />
    </ScreenLayout>
  </ElementsProvider>
);
