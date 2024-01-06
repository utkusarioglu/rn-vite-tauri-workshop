/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  useColorScheme,
  SafeAreaView,
  // ScrollView,
  StatusBar,
  // StyleSheet,
} from "react-native";

import { HomeScreen, CounterScreen } from "xp-app/screens";
import { ElementsProvider, useTheme } from "elements";
import androidTamaguiConfig from "../tamagui.config.mts";

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export function AndroidApp(): React.JSX.Element {
  const prefersDarkMode = useColorScheme() === "dark";

  return (
    <ElementsProvider
      config={androidTamaguiConfig}
      // @ts-ignore #1
      defaultTheme={prefersDarkMode ? "dark" : "light"}
    >
      <ThemedApp />
    </ElementsProvider>
  );
}

const ThemedApp = () => {
  const prefersDarkMode = useColorScheme() === "dark";
  const theme = useTheme();
  const safeAreaViewStyle = {
    backgroundColor: theme.background.val,
    flex: 1,
  };

  return (
    <SafeAreaView style={safeAreaViewStyle}>
      <StatusBar
        barStyle={prefersDarkMode ? "light-content" : "dark-content"}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <CounterScreen /> */}
      <HomeScreen />
    </SafeAreaView>
  );
};
