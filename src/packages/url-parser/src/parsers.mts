type PusherOptions = unknown;
export type ValueTypes = string | number | boolean;

/**
 * Inspired by rxjs
 */
function isNumeric(val: any): boolean {
  return !(val instanceof Array) && val - parseFloat(val) + 1 >= 0;
}

function parseStringifiedValue(value: string): ValueTypes {
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  if (["TRUE", "FALSE"].includes(value.toUpperCase())) {
    return value === "true";
  }
  return value;
}

/**
 * @dev
 * 1- Cannot use type casting on the reduce accumulator object because of metro
 * bundler throwing an error for the "as" statement. Because of this, the line
 * for assigning the key to the accumulator needs to be ignored by typescript.
 */
export function parseSearchParamStr(
  searchParamsStr: string,
  rawParams: Record<string, ValueTypes>,
) {
  return (
    searchParamsStr &&
    searchParamsStr.split("&").reduce((acc, entry) => {
      const [key, value] = entry.split("=");
      if (rawParams[key]) {
        // TODO standardize the error
        throw new Error(`Param ${key} is defined twice`);
      }
      // @ts-expect-error: #1
      acc[key] = parseStringifiedValue(value);
      return acc;
      // #1
    }, {})
  );
}

export function parseSearchParams(
  props: Record<string, ValueTypes>,
  obj: URLSearchParams,
) {
  const parsed = {};
  for (const [key, val] of obj) {
    if (props && props[key]) {
      console.warn(`Key ${key} defined twice`);
    }
    // @ts-expect-error
    parsed[key] = parseStringifiedValue(val);
  }
  return parsed;
}

export function parseHash(
  rawParams: PusherOptions,
  rawHash: string,
): string | undefined {
  if (rawParams.hash && rawHash) {
    throw new Error("Hash defined twice");
  }
  const hash = rawHash || rawParams.hash;
  return hash && hash.replace(/^#/, "");
}

export function parseHref(props: Record<string, ValueTypes>, href: string) {
  const url = new URL(href);
  props = {
    ...props,
    ...parseSearchParams(props, url.searchParams),
  };
  const hash = parseHash(props, url.hash);

  if (hash) {
    return {
      ...props,
      hash,
    };
  }

  return props;
}
