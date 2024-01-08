import linuxTamaguiConfig from "#/tamagui.config.mts";
import { LinuxCounterScreen } from "#screens/Counter.screen.tsx";
import { LinuxHomeScreen } from "#screens/Home.screen.tsx";
import { ElementsProvider } from "package--elements";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LinuxHomeScreen />,
  },
  {
    path: "/counter",
    element: <LinuxCounterScreen />,
  },
]);

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export const LinuxApp = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <ElementsProvider
      config={linuxTamaguiConfig}
      /* @ts-expect-error: #1*/
      defaultTheme={prefersDark ? "dark" : "light"}
      disableRootThemeClass
    >
      <RouterProvider router={router} />
    </ElementsProvider>
  );
};
