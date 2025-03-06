import type { PathTransformer } from "../../navigation/navigation.types.mts";
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
 *
 * @testCases ```yaml
 * args:
 *   rawPath:
 *     Illegal:
 *       Types other than strings:
 *       # As this method uses the generic URL class, we don't test sanity
 *       # checks. If a problem emerges, those can be handled by regression
 *       # tests.
 *       Malformed href strings:
 *   rawParams:
 *     Illegal:
 *       Types other than generic js object:
 *     Legal:
 *       undefined,
 *       Generic Js objects:
 * ```
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
