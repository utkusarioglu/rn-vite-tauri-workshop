declare module "package--elements/vite" {
  import type { TamaguiOptions } from "@tamagui/static";
  import type {
    tamaguiExtractPlugin,
    tamaguiPlugin,
  } from "@tamagui/vite-plugin";

  interface PrepareTamaguiVitePluginsParams {
    extract: boolean;
    options: Omit<TamaguiOptions, "platform"> & {
      useReactNativeWebLite?: boolean;
    };
  }

  type TamaguiPluginReturn = ReturnType<typeof tamaguiPlugin>;
  type TamaguiExtractPluginReturn = ReturnType<typeof tamaguiExtractPlugin>;

  function prepareTamaguiVitePlugins(
    params: PrepareTamaguiVitePluginsParams,
  ): [TamaguiPluginReturn] | [TamaguiPluginReturn, TamaguiExtractPluginReturn];

  const elementsOptimizeDepsInclude: string[];

  export { prepareTamaguiVitePlugins, elementsOptimizeDepsInclude };
}
