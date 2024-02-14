const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("node:path");

const appRoot = __dirname;
const repoRoot = path.resolve(appRoot, "../../..");
const packagesRoot = path.resolve(repoRoot, "src/packages");
const nodeModulesPath = path.resolve(repoRoot, "node_modules");

const PATH_ALIASES = [
  {
    startsWith: "#screens/",
    replace: `${__dirname}/src/components/screens/`,
  },
  {
    startsWith: "#navigators/",
    replace: `${__dirname}/src/components/navigators/`,
  },
  {
    startsWith: "#hocs/",
    replace: `${__dirname}/src/components/hocs/`,
  },
  {
    startsWith: "#types/",
    replace: `${__dirname}/src/types/`,
  },
  {
    startsWith: "#/",
    replace: `${__dirname}/`,
  },
];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [appRoot, nodeModulesPath, packagesRoot],

  resolver: {
    // sourceExts: ["mts", "tsx", "ts", "mjs", "cjs", "jsx", "js", "json"],
    sourceExts: ["mts", "tsx", "ts", "mjs", "cjs", "jsx", "js", "json"],

    unstable_enablePackageExports: true,
    // TODO be on the watchout for this. it doesn't currently work but it would
    // simplify development tremendously. packages/url-parser is waiting for
    // this to become stable so it can use "react-native-url-polyfill"
    // unstable_conditionsByPlatform: {
    //   android: new Set(["react-native", "import", "require"]),
    // },
    unstable_conditionNames: ["react-native", "import", "require"],

    resolveRequest: (context, moduleName, platform) => {
      for (const alias of PATH_ALIASES) {
        if (moduleName.startsWith(alias.startsWith)) {
          const filePath = context.dependency.name.replace(
            alias.startsWith,
            alias.replace,
          );

          return {
            filePath,
            type: "sourceFile",
          };
        }
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },

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
