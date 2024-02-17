import type {
  StringNumberBoolean,
  ConflictHandlingMethods,
} from "./parsers.types.mts";
import { mergeParams, convertValueType } from "../utils/utils.mts";
import { ERRORS } from "../errors.mts";

/**
 * Parses url search param string as a param object.
 *
 * @param searchParamsStr string to parse as url search params.
 *
 * @returns Url search string params parsed as a JS object.
 *
 * @dev
 * TODO current implementation does parse url encoding.
 *
 * @testCases ```yaml
 * args:
 *   searchParamsStr:
 *     Illegal:
 *       undefined & null:
 *        Spaces:
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
 *       Multiple params:
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
      if (!entry.length) {
        throw new Error(ERRORS.ZERO_LENGTH_ENTRY);
      }
      const spaceMatches = entry.match(/\s/g);
      if (spaceMatches) {
        throw new Error(ERRORS.NO_SPACE_ALLOWED);
      }
      const equalMatches = entry.match(/=/g);
      if (equalMatches) {
        if (equalMatches.length > 1) {
          throw new Error(ERRORS.MALFORMED_INPUT);
        } else if (equalMatches.length === 0) {
          throw new Error(ERRORS.ASSIGNMENT_REQUIRED);
        }
      }
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
 *
 * @testCases ```yaml
 * args:
 *   urlSearchParams:
 *     Legal:
 *       Empty Object:
 *       # Checks if `convertValueType` is called as expected
 *       Single Param:
 *       # Checks if all keys in the URLSearchParams object is present in the
 *       # returned generic object.
 *       Multiple Params:
 * ```
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
 * TODO current implementation does parse url encoding.
 *
 * @testCases
 * rawHash:
 *   Illegal:
 *     Types other than strings:
 *     Strings with multiple pounds:
 *     Strings with spaces:
 *   Legal:
 *     Empty params:
 *       Undefined & Null & Empty String:
 *       String-Like:
 *       - Pound string
 *     Strings:
 *       With Pound:
 *       Without Pound:
 */
export function parseHash(
  rawHash: string | undefined | null,
): string | undefined {
  if (rawHash === undefined || rawHash === null) {
    return undefined;
  }
  if (typeof rawHash !== "string") {
    throw new Error(ERRORS.UNSUPPORTED_TYPE);
  }
  if (rawHash.length === 0) {
    return undefined;
  }
  const poundCount = (rawHash.match(/#/g) || []).length;
  if (poundCount > 1) {
    throw new Error(ERRORS.MALFORMED_INPUT);
  }
  if (rawHash.match(/\s/g)) {
    throw new Error(ERRORS.NO_SPACE_ALLOWED);
  }
  return rawHash.replace(/^#/, "");
}

/**
 * Parses the url search params of a string url as a js object
 *
 * @param href Url string
 *
 * @param additionalParams additional parameters given to the navigation provider.
 * @param onConflict enum for deciding what to do if there are conflicting keys
 * between url params and additional params.
 *
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
