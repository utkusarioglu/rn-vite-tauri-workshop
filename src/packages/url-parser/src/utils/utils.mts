import type {
  ConflictHandlingMethods,
  StringNumberBoolean,
} from "../parsers/parsers.types.mts";

/**
 * Inspired by rxjs
 */
function isNumeric(val: any): boolean {
  return !(val instanceof Array) && val - parseFloat(val) + 1 >= 0;
}

export function parseStringifiedValue(value: string): StringNumberBoolean {
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  if (["TRUE", "FALSE"].includes(value.toUpperCase())) {
    return value === "true";
  }
  return value;
}

export function handleConflict(
  errorMessage: string,
  onConflict: ConflictHandlingMethods,
) {
  switch (onConflict) {
    case "throw":
      throw new Error(errorMessage);
    case "warn":
      console.warn(errorMessage);
      break;
  }
}
