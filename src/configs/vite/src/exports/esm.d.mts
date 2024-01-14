declare module "config--vite" {
  import type { AliasOptions } from "vite";

  export const resolveAliasesFactory: (rootPath: string) => AliasOptions;
}

export {};
