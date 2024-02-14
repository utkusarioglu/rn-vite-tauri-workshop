export const ERRORS = {
  UNSUPPORTED_TYPE: "UNSUPPORTED_TYPE",
  UNRECOGNIZED_ENUM: "UNRECOGNIZED_ENUM",
  NO_OR_WRONG_VALUE: "NO_OR_WRONG_VALUE",
} as const;

export const LOGS = {
  IGNORING_CONFLICT: "Ignoring conflict",
  HASH_DEFINED_TWICE: "Hash defined twice",
  keyDefinedTwice: (key: string) => `Key '${key}' defined twice`,
} as const;
