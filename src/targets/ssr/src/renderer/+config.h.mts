import type { Config } from "vike/types";

// https://vike.dev/config
export default {
  /* To enable Client-side Routing:
  !! WARNING !! Before doing so, read https://vike.dev/clientRouting */
  clientRouting: true,
  hydrationCanBeAborted: true,

  // See https://vike.dev/data-fetching
  passToClient: ["pageProps"],
} satisfies Config;
