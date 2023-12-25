import type { FC, PropsWithChildren } from "react";
import { TamaguiProvider, createTamagui } from "@tamagui/core";

type ElementsProvider = typeof TamaguiProvider &
  PropsWithChildren<{
    config: ReturnType<typeof createTamagui>;
  }>;

export const ElementsProvider: FC<ElementsProvider> = ({
  children,
  config,
  ...rest
}) => {
  return (
    <TamaguiProvider config={config} {...rest}>
      {children}
    </TamaguiProvider>
  );
};
