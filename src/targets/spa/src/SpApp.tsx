import spaTamaguiConfig from "#/tamagui.config.mts";
import { SpaHomeScreen } from "#screens/Home.screen.tsx";
import { SpaCounterScreen } from "#screens/Counter.screen.tsx";
import { ElementsProvider } from "package--elements";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SpaHomeScreen />,
  },
  {
    path: "/counter",
    element: <SpaCounterScreen />,
  },
]);

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export const SpApp = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <ElementsProvider
      config={spaTamaguiConfig}
      /* @ts-expect-error: #1 */
      defaultTheme={prefersDark ? "dark" : "light"}
      disableRootThemeClass
    >
      <RouterProvider router={router} />
    </ElementsProvider>
  );
};
