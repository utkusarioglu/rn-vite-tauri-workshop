import type { PathTransformer } from "../navigation/navigation.types.mts";
import { parseHash } from "package--url-parser";

// TODO remove `any`
export function browserPathTransformer<T extends Record<string, string>>(
  rawPath: string,
  rawParams: T,
): ReturnType<PathTransformer> {
  const url = new URL([window.location.origin, rawPath].join(""));

  const hash = parseHash(rawParams, url.hash, "throw");

  if (hash) {
    url.hash = hash;
    delete rawParams.hash;
  }

  Object.entries(rawParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return {
    path: url.pathname + url.search + url.hash,
    params: rawParams,
  };
}
