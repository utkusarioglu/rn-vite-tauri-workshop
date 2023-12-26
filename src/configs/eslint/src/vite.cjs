const typescriptEslint = require("typescript-eslint");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const eslint = require("eslint");
const eslintApp = require("./app.cjs");

module.exports = [
  ...eslintApp,
  {
    languageOptions: {
      globals: {
        browser: true,
        es2020: true,
      },
    },
    plugins: {
      eslint,
      typescriptEslint,
      reactHooks,
      reactRefresh,
    },
    rules: {
      "reactRefresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
