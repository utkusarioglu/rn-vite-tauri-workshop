import type {
  ConflictHandlingMethods,
  StringNumberBoolean,
} from "../parsers/parsers.types.mts";
import { ERRORS, LOGS } from "../errors.mts";

/**
 * @internal
 *
 * Returns true if the given param value is of a numeric type.
 *
 * @param val Value to check.
 * @returns A boolean, true if the input is convertible to a number.
 *
 * @remarks
 * This function is inspired by its RxJs counterpart.
 *
 * @testStates ```yaml
 * args:
 *   val:
 *     Non numeric types:
 *       Primitives excluding `number`:
 *       Complex types:
 *     Numeric types:
 *       Floats:
 *       Integers:
 *       BigInt:
 * ```
 */
export function isNumeric(val: any): boolean {
  if (typeof val === "bigint") {
    return true;
  }
  return !(val instanceof Array) && val - parseFloat(val) + 1 >= 0;
}

/**
 * @internal
 *
 * Parses stringified values according to following rules:
 * 1. Numeric values as numbers
 * 2. `true` & `false` of all casings as booleans
 * 3. The rest as strings
 *
 * @param value String value that could be converted to a number or a boolean.
 *
 * @returns Value as a string, number or boolean.
 *
 * @testStates ```yaml
 * args:
 *   value:
 *     # These should normally be prevented by TypeScript
 *     Illegal Inputs:
 *       Undefined:
 *       Null:
 *       ...Other primitive and complex types
 *     Legal Inputs:
 *       Stringified Numbers:
 *         Edge cases:
 *           - 0
 *           - 1
 *         Arbitrary positive integers:
 *         Arbitrary negative integers:
 *         Arbitrary positive floats:
 *         Arbitrary negative floats:
 *       Booleans of various casings:
 *       Pure Strings:
 *         # These are string values that cannot be parsed as any of the other
 *         # supported types.
 *         Edge cases:
 *           Empty String:
 *           Space String:
 *         Strings of arbitrary lengths and characters:
 * ```
 */
export function convertValueType(value: string): StringNumberBoolean {
  if (typeof value !== "string") {
    throw new Error(ERRORS.UNSUPPORTED_TYPE);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  if (typeof value["toUpperCase"] !== "function") {
    throw new Error(ERRORS.UNSUPPORTED_TYPE);
  }

  const upperCaseValue = value.toUpperCase();
  if (["TRUE", "FALSE"].includes(upperCaseValue)) {
    return upperCaseValue === "TRUE";
  }

  return value;
}

/**
 * @internal
 *
 * Depending on the `onConflict` param, does one of the 3 following things:
 * 1. Throws an error
 * 2. Gives a warning
 * 3. does nothing
 *
 * @param errorMessage A string that shall be used as the error message if the
 * method throws or warns.
 * @param onConflict Enum for deciding how the method should handle the conflict.
 *
 * @dev
 * TODO this method desperately needs telemetry to be implemented.
 *
 * @throws
 * UNRECOGNIZED_ENUM if `onConflict` value is not recognized
 *
 * @testCases ```yaml
 * args:
 *   errorMessage:
 *     Illegal:
 *       Undefined:
 *       Null:
 *       Empty String:
 *     Legal:
 *       Edge cases:
 *         - String of spaces of arbitrary length
 *       Arbitrary strings:
 *   onConflict:
 *     Illegal:
 *       Undefined & Null:
 *       Non-enum values:
 *     Legal:
 *       Enum values:
 * ```
 */
export function handleConflict(
  errorMessage: string,
  onConflict: ConflictHandlingMethods,
) {
  if (!errorMessage || !errorMessage.length) {
    throw new Error(ERRORS.NO_OR_WRONG_VALUE);
  }

  switch (onConflict) {
    case "throw":
      throw new Error(errorMessage);
    case "warn":
      console.warn(errorMessage);
      break;
    case "ignore":
      console.log("Ignoring conflict");
      break;

    default:
      throw new Error(ERRORS.UNRECOGNIZED_ENUM);
  }
}

/**
 * Merges the following values into one object:
 * 1. Url search params: These are params retrieved from url string
 * 2. Params given to the navigation method as an object
 * 3. Hash value of the url string or the param object given to the navigation
 *
 * @param searchParams Search params parsed by {@link parseUrlSearchParamStrAsObject}
 * @param additionalParams additional params given to the navigation provider.
 * @param hash hash string or undefined
 * @param onConflict Enum for how to handle any key conflicts.
 *
 * @returns merged params as JS object
 *
 * @testCases ```yaml
 * args:
 *   searchParams:
 *     Empty Object:
 *     Single Member Objects:
 *       Strings:
 *       Numbers:
 *       Booleans:
 * ```
 */
export function mergeParams<
  F extends Record<string, StringNumberBoolean>,
  S extends Record<string, StringNumberBoolean>,
>(
  searchParams: F,
  additionalParams: S,
  hash: string | undefined,
  onConflict: ConflictHandlingMethods,
): F & S {
  Object.keys(searchParams).forEach((key) => {
    if (additionalParams[key] !== undefined) {
      handleConflict(LOGS.keyDefinedTwice(key), onConflict);
    }
  });

  const paramsWithoutHash = { ...searchParams, ...additionalParams };

  if (hash) {
    if (hash && paramsWithoutHash["hash"]) {
      handleConflict(LOGS.HASH_DEFINED_TWICE, onConflict);
    }

    return {
      ...paramsWithoutHash,
      hash,
    };
  }

  return paramsWithoutHash;
}
