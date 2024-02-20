import type { StringNumberBoolean } from "package--url-parser";

/**
 * Return for any path transformer function
 */
export type PathTransformerReturn = {
  path: string;
  params: Record<string, StringNumberBoolean>;
};

/**
 * Common type for all path transformers
 */
export type PathTransformer = (
  rawPath: string,
  params?: PusherOptions,
) => PathTransformerReturn;

/**
 * Parameters required by PathTransformer
 */
export type PathTransformerParams = Parameters<PathTransformer>;

/**
 * Navigation Push function
 */
type Pusher = (href: string, params?: PusherOptions) => void;

/**
 * Handler callback functions that allow the {@link Navigation} to handle
 * routing for the target app.
 *
 * @dev
 * Currently, the only implemented routing function is `push`. This shall
 * change as the need for other methods naturally emerge.
 */
export interface Handlers {
  push: Pusher;
}

/**
 * Additional Parameters given to routing function, such as `push`.
 */
export type PusherOptions = Record<string, StringNumberBoolean>;

/**
 * Logger provider from the target app
 *
 * @dev
 * TODO this type need to be corrected once the logging infrastructure is in place
 */
export type Logger = (log: any) => void;
