module.exports = {
  // presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "@tamagui/babel-plugin",
      {
        components: ["tamagui"],
        config: "tamagui.config.mts",
        importsWhitelist: ["constants.mjs", "colors.mjs"],
        logTimings: true,
        disableExtraction: !["TRUE", "true", "1"].includes(process.env.EXTRACT),
      },
    ],
  ],
};
