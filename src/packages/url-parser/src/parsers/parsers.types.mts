/**
 * Alias for a union of string, number and boolean.
 *
 * @remarks
 * Describes the possible types that can be returned by
 * {@link convertValueType}.
 */
export type StringNumberBoolean = string | number | boolean;

/**
 * Enum listing the possible responses that {@link handleConflict} method can give.
 */
export type ConflictHandlingMethods = "ignore" | "warn" | "throw";
