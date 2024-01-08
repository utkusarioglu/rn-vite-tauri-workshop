const reactNative = require("eslint-plugin-react-native");
const eslintBase = require("config--eslint/app");

module.exports = [
  ...eslintBase,
  {
    plugins: {
      reactNative,
    },
    // extends: "@react-native",
  },
];
