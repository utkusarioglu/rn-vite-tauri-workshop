module.exports = {
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

    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env.local",
      },
    ],
    [
      "transform-inline-environment-variables",
      {
        include: [
          "TAMAGUI_TARGET",
          "WEB_APP_URL",
          "API_V1_URL",
          // "I18N_DEBUG_ENABLED",
        ],
      },
    ],
  ],
};
