import type {
  StringNumberBoolean,
  ConflictHandlingMethods,
} from "./parsers.types.mts";
import { mergeParams, convertValueType } from "../utils/utils.mts";

/**
 * Parses url search param string as a param object.
 *
 * @param searchParamsStr string to parse as url search params.
 *
 * @returns Url search string params parsed as a JS object.
 *
 * @dev
 * TODO tests are incomplete, Illegal tests are not implemented
 *
 * @testCases ```yaml
 * args:
 *   searchParamsStr:
 *     Illegal:
 *       undefined & null:
 *       `&` at wrong places:
 *           # leads to ub for key, value pairs.
 *         - Consecutive occurrence of `&`
 *       `=` at wrong places:
 *           # leads to ub for key, value pairs.
 *         - Consecutive occurrences of "="
 *           # leads to ub, resembling some kind of double assignment to a
 *           # key, this isn't considered legal.
 *         - Multiple occurrences of `=` between `&`
 *     Legal:
 *       Empty string:
 *       Single param:
 *         Stringified numbers:
 *         Strings:
 *         Stringified booleans:
 *       Multiple Params:
 * ```
 */
export function parseUrlSearchParamStrAsObject<
  R extends Record<string, StringNumberBoolean>,
>(searchParamsStr: string): R {
  const hasSearchParamsStr = !!searchParamsStr && searchParamsStr !== "";
  if (!hasSearchParamsStr) {
    return {} as R;
  }

  return searchParamsStr.split("&").reduce(
    (acc, entry) => {
      const [key, value] = entry.split("=");
      acc[key] = convertValueType(value);
      return acc;
    },
    {} as Record<string, StringNumberBoolean>,
  ) as R;
}

/**
 * Parses an instance of urlSearchParams object as a params object.
 * This involves converting stringified value types to numbers or booleans if
 * it applies.
 *
 * @dev
 * Please refer to {@link convertValueType} for details about the value
 * conversion logic.
 */
export function parseUrlSearchParamsAsObject<
  T extends Record<string, StringNumberBoolean>,
>(urlSearchParams: URLSearchParams): T {
  const parsed: Record<string, StringNumberBoolean> = {};
  for (const [key, value] of urlSearchParams) {
    parsed[key] = convertValueType(value);
  }
  return parsed as T;
}

/**
 * Removes the pound (#) sign from the beginning of a hash if the hash is
 * defined.
 *
 * @param rawHash Hash section of an url string.
 *
 * @returns Parsed has or undefined, depending on the input value.
 *
 * @remarks
 * This method exists for the possibility of hashes needing more processing
 * before consumption in the future.
 *
 * @dev
 * This method uses the {@link URL} api in browsers. React Native doesn't have
 * this api fully implemented by default.
 *
 * TODO current implementation does not check for multiple appearances of "#"
 * in the string. This may be cause for trouble in the future.
 *
 * TODO current implementation does not check for any characters that aren't
 * allows by url specs, this may be a cause for concern.
 */
export function parseHash(
  rawHash: string | undefined | null,
): string | undefined {
  if (!rawHash || rawHash.length === 0) {
    return undefined;
  }
  return rawHash.replace(/^#/, "");
}

/**
 * Parses the url search params of a string url as a js object
 *
 * @param href Url string
 * @param additionalParams additional parameters given to the navigation provider.
 * @param onConflict enum for deciding what to do if there are conflicting keys
 * between url params and additional params.
 * @returns Parameters parsed as a js object.
 */
export function parseHrefParamsAsObject<
  T extends Record<string, StringNumberBoolean>,
>(href: string, additionalParams: T, onConflict: ConflictHandlingMethods) {
  const url = new URL(href);
  const searchParams = parseUrlSearchParamsAsObject(url.searchParams);
  const hash = parseHash(url.hash);
  const params = mergeParams(searchParams, additionalParams, hash, onConflict);

  return params;
}

/**
 * Stringifies Params Js object.
 *
 * @param params Params as a js object
 * @returns params stringified in url search params and hash format.
 */
export function stringifyParams(
  params: Record<string, StringNumberBoolean>,
): string {
  const searchParams = Object.entries(params)
    .reduce((acc, [key, value]) => {
      if (key === "hash") {
        return acc;
      }
      if (Array.isArray(value)) {
        value.forEach((v) => {
          acc.push(`${key}=${v}`);
        });
      } else {
        acc.push(`${key}=${value.toString()}`);
      }
      return acc;
    }, [] as string[])
    .join("&");

  let stringified = "";

  if (searchParams) {
    stringified += "?";
    stringified += searchParams;
  }

  if (params["hash"]) {
    stringified += "#";
    stringified += params["hash"];
  }

  return stringified;
}
