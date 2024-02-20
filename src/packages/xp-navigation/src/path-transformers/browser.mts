import type { PathTransformer } from "../navigation/navigation.types.mts";
import {
  parseHash,
  mergeParams,
  parseUrlSearchParamsAsObject,
  stringifyParams,
  type StringNumberBoolean,
} from "package--url-parser";

/**
 * Provides typical path transformation for browser based targets such as spa,
 * ssr, tauri. Providing this transformer should be sufficient for most use
 * cases in these environments.
 *
 * @param rawPath Raw path received from xp-app
 * @param rawParams Raw parameters received from xp-app
 *
 * @returns Path and params transformed to be used by the target
 */
export function browserPathTransformer<
  T extends Record<string, StringNumberBoolean>,
>(rawPath: string, rawParams?: T): ReturnType<PathTransformer> {
  const additionalParams = rawParams || {};
  const url = new URL([window.location.origin, rawPath].join(""));
  const hash = parseHash(url.hash);
  const searchParams = parseUrlSearchParamsAsObject(url.searchParams);
  const params = mergeParams(searchParams, additionalParams, hash, "warn");
  const searchParamStr = stringifyParams(params);
  const path = url.pathname + searchParamStr + url.hash;

  return {
    path,
    params,
  };
}
