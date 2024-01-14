import { pathsToModuleNameMapper } from "ts-jest";
import tsConfig from "./tsconfig.json" assert { type: "json" };

/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  // [...]
  // preset: "ts-jest/presets/default-esm", // or other ESM presets
  // moduleNameMapper: {
  //   "^(\\.{1,2}/.*)\\.js$": "$1",
  //   "^(\\.{1,2}/.*)\\.mjs$": "$1",
  // },
  moduleFileExtensions: ["mts", "ts", "js"],
  moduleNameMapper: pathsToModuleNameMapper(
    tsConfig.compilerOptions.paths || {},
    {
      useESM: true,
      prefix: "<rootDir>",
    },
  ),
  testMatch: ["<rootDir>/src/utils/utils.test.mts"],
  // resolver: "<rootDir>/mjs-resolver.mts",
  transform: {
    "^.+\\.m?tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
