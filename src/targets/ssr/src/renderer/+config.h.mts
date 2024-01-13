import type { Config } from "vike/types";

export default {
  clientRouting: true,
  hydrationCanBeAborted: true,

  // See https://vike.dev/data-fetching
  passToClient: ["pageProps", "routeParams"],
} satisfies Config;
