import type { PathTransformer } from "../navigation/navigation.types.mts";
import {
  parseHash,
  mergeParams,
  parseUrlSearchParamsAsObject,
  stringifyParams,
  type StringNumberBoolean,
} from "package--url-parser";

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

  console.log({ path, params, searchParams });

  return {
    path,
    params,
  };
}
