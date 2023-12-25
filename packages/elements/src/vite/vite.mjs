import Module from "node:module";
const require = Module.createRequire(import.meta.url);
const { tamaguiExtractPlugin, tamaguiPlugin } = require("@tamagui/vite-plugin");

export const prepareTamaguiVitePlugins = ({ extract, options }) => {
  return [
    tamaguiPlugin(options),
    extract ? tamaguiExtractPlugin(options) : null,
  ].filter(Boolean);
};

export const elementsOptimizeDepsInclude = ["elements > tamagui"];
