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

import { ElementsProvider, useTheme } from "elements";
import androidTamaguiConfig from "#/tamagui.config.mts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "#navigators/root/Root.navigator.tsx";

/**
 * @dev
 * 1- TODO Tamagui type mismatch
 */
export function AndroidApp(): React.JSX.Element {
  const prefersDarkMode = useColorScheme() === "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ElementsProvider
        config={androidTamaguiConfig}
        // @ts-ignore #1
        defaultTheme={prefersDarkMode ? "dark" : "light"}
      >
        <ThemedApp />
      </ElementsProvider>
    </GestureHandlerRootView>
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
      <RootNavigator />
    </SafeAreaView>
  );
};
