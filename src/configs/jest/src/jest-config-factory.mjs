import { defaults } from "jest-config";
import { pathsToModuleNameMapper } from "ts-jest";

export const jestConfigFactory = (tsConfig) =>
  /** @type {import('jest').Config} */
  ({
    moduleFileExtensions: ["mts", ...defaults.moduleFileExtensions],
    moduleNameMapper: pathsToModuleNameMapper(
      tsConfig.compilerOptions.paths || {},
      {
        useESM: true,
        prefix: "<rootDir>",
      },
    ),
    testMatch: [
      ...defaults.testMatch,
      "**/__tests__/**/*.[mc][jt]s?(x)",
      "**/?(*.)+(spec|test).[mc][tj]s?(x)",
    ],
    transform: {
      "^.+\\.m?tsx?$": [
        "ts-jest",
        {
          useESM: true,
        },
      ],
    },
  });
