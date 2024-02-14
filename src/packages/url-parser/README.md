# Packages/UrlParser

Provides uniform url parsing behavior across all frontend platforms.

## Why?

Ubiquitous `new URL` api that is offered in browsers is not available on React Native. There is a [polyfill library](https://github.com/charpeni/react-native-url-polyfill) that handles this task. However, the process of consuming this library is currently blocked by the following issues:

1. This repo is trying to stay away from extension based bundling practices such as using `.android.ts` towards either using `package.json` export entry points or using drivers.
2. Metro bundler's `package.json` export use features are in experimental stage and not yet reliable enough to consider as a solution. Which means a separate entrypoint for React Native cannot be provided by this repo.
3. The practice of separately adding the previously mentioned polyfill library to the React Native targets is not desired, as this renders any feature that relies on such polyfills to either require checks that the polyfills are available, or have the developers figure out which apis are missing during every new target introduction to the repo. Which is sub-par DX, and can be avoided.

Because of these issues, the decision was made to create a package that would replicate the required features of browser `URL` api on methods that cannot use the `URL` api.
