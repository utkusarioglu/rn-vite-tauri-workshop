const reactNative = require("eslint-plugin-react-native");
const eslintBase = require("eslint-config/app");

module.exports = [
  ...eslintBase,
  {
    plugins: {
      reactNative,
    },
    // extends: "@react-native",
  },
];
