const {getDefaultConfig, mergeConfig} = require("@react-native/metro-config");
const path = require("node:path");

const appRoot = __dirname;
const workspaceRoot = path.resolve(appRoot, "../..");
const packagesRoot = path.resolve(workspaceRoot, "packages");
const nodeModulesPath = path.resolve(workspaceRoot, "node_modules");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [appRoot, nodeModulesPath, packagesRoot],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(appRoot), config);
