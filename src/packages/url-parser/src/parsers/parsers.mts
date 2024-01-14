import type {
  StringNumberBoolean,
  ConflictHandlingMethods,
} from "./parsers.types.mts";
import { handleConflict, parseStringifiedValue } from "../utils/utils.mts";

/**
 * @dev
 * 1- Cannot use type casting on the reduce accumulator object because of metro
 * bundler throwing an error for the "as" statement. Because of this, the line
 * for assigning the key to the accumulator needs to be ignored by typescript.
 * 2- TODO standardize the error
 */
export function parseSearchParamStr<
  T extends Record<string, StringNumberBoolean>,
>(searchParamsStr: string, rawParams: T, onConflict: ConflictHandlingMethods) {
  if (!searchParamsStr || searchParamsStr === "") {
    return {};
  }

  return searchParamsStr.split("&").reduce(
    (acc, entry) => {
      const [key, value] = entry.split("=");
      if (rawParams[key]) {
        handleConflict(`Key '${key}; defined twice`, onConflict);
      }
      acc[key] = parseStringifiedValue(value);
      return acc;
    },
    {} as Record<string, StringNumberBoolean>,
  );
}

export function parseSearchParams<
  T extends Record<string, StringNumberBoolean>,
>(
  rawParams: T,
  urlSearchParams: URLSearchParams,
  onConflict: ConflictHandlingMethods,
) {
  const parsed: Record<string, StringNumberBoolean> = {};
  for (const [key, val] of urlSearchParams) {
    if (rawParams && rawParams[key]) {
      handleConflict(`Key '${key}' defined twice`, onConflict);
    }
    parsed[key] = parseStringifiedValue(val);
  }
  return parsed;
}

export function parseHash<T extends { hash?: string }>(
  rawParams: T,
  rawHash: string,
  onConflict: ConflictHandlingMethods,
): string | undefined {
  if (rawParams.hash && rawHash) {
    handleConflict("Hash defined twice", onConflict);
  }
  const hash = rawHash || rawParams.hash;
  return hash && hash.replace(/^#/, "");
}

export function parseHref<T extends Record<string, StringNumberBoolean>>(
  rawParams: T,
  href: string,
  onConflict: ConflictHandlingMethods,
) {
  const url = new URL(href);
  const searchParams = parseSearchParams(
    rawParams,
    url.searchParams,
    onConflict,
  );
  const hash = parseHash(rawParams, url.hash, onConflict);

  if (hash) {
    return {
      ...rawParams,
      ...searchParams,
      hash,
    };
  }

  return {
    ...rawParams,
    ...searchParams,
  };
}
