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
import type { RootStackParamList } from "./Root.navigator.types.mts";
import { LINKING } from "./Root.navigator.constants.mts";

// TODO this doesn't belong in this module, it shall be placed in a themes
// module of some sort
const DARK_THEME = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(20, 20, 20)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const prefersDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer
      linking={LINKING}
      theme={prefersDarkMode ? DARK_THEME : ReactNavigationDefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen name="home" component={AndroidHomeScreen} />
        <Stack.Screen
          name="counter"
          component={AndroidCounterScreen}
          initialParams={{ initialValue: 1 }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
