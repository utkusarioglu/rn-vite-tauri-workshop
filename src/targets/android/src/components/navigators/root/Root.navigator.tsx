import React from "react";
import { AndroidHomeScreen } from "#screens/Home.screen.tsx";
import { AndroidCounterScreen } from "#screens/Counter.screen.tsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  // DarkTheme as ReactNavigationDarkTheme,
  DefaultTheme as ReactNavigationDefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

console.log({ appUrl: process.env.WEB_APP_URL });

const linking = {
  prefixes: [process.env.WEB_APP_URL!],
  config: {
    screens: {
      home: "",
      counter: "counter",
    },
  },
};

type RootNavigatorProps = {
  counter: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootNavigatorProps>();

export const RootNavigator = () => {
  const prefersDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer
      linking={linking}
      theme={
        prefersDarkMode
          ? {
              dark: true,
              colors: {
                primary: "rgb(10, 132, 255)",
                background: "rgb(20, 20, 20)",
                card: "rgb(18, 18, 18)",
                text: "rgb(229, 229, 231)",
                border: "rgb(39, 39, 41)",
                notification: "rgb(255, 69, 58)",
              },
            }
          : ReactNavigationDefaultTheme
      }
    >
      <Stack.Navigator>
        <Stack.Screen name="home" component={AndroidHomeScreen} />
        <Stack.Screen name="counter" component={AndroidCounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
