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
    startsWith: "#wrappers/",
    replace: `${__dirname}/src/components/wrappers/`,
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
    sourceExts: ["js", "jsx", "json", "ts", "tsx", "mts", "mjs", "cjs"],
    unstable_enablePackageExports: true,

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
