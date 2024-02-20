import type { StringNumberBoolean } from "package--url-parser";
import type { Handlers, PathTransformer, Logger } from "./navigation.types.mts";

/**
 * Main class that provides the cross platform navigation feature.
 */
export class Navigation {
  static handlers: Handlers = {
    push: () => {
      throw new Error("Navigation.push used before being defined");
    },
  };
  static pathTransformer: PathTransformer | undefined;
  static logger: Logger | undefined;

  /**
   * Accepts functions that facilitate routing in the target app.
   *
   * Currently only `push` is available. Functions such as `replace` may
   * be implemented when the need arises.
   *
   * @param handlers Js object that features callbacks for target app routing
   * library functions such as `push`, `replace`, `back`.
   */
  static setHandlers(handlers: Handlers) {
    Navigation.handlers = handlers;
  }

  /**
   * Sets a logger such as `console.log` or "winston" as the logging tool.
   *
   * @param logger logging function instance
   */
  static setLogger(logger: Logger): void {
    Navigation.logger = logger;
  }

  /**
   * Logs the given arguments using the logger provider.
   *
   * @param logParams parameters that a particular logging provider expects.
   */
  static log(...logParams: Parameters<Logger>): void {
    if (!Navigation.logger) {
      throw new Error("Logger hasn't been defined");
    }
    Navigation.logger(...logParams);
  }

  /**
   * Sets the path transformer for the class. The transformer allows the target
   * app instance to understand the cross-platform app's routing request.
   *
   * As an example: xp-app may request the page `settings` while the target may need the route
   * to be named `Settings`. Path transformer is the layer that transform the
   * xp-app path to target path.
   *
   * @param transformer Callback function that handles the transform.
   */
  static setPathTransformer(transformer: PathTransformer): void {
    Navigation.pathTransformer = transformer;
  }

  /**
   * Returns the path transformer set by {@link setPathTransformer}
   *
   * @returns Path transformer function.
   */
  static getPathTransformer(): PathTransformer {
    if (!Navigation.pathTransformer) {
      throw new Error("PathTransformer not defined");
    }
    return Navigation.pathTransformer;
  }

  /**
   * Provides the most typical routing feature: Moves the app to the next page.
   *
   * @param rawHref URL compatible href string
   * @param rawParams Additional parameters that will guide the routing at the
   * target app.
   */
  static push(
    rawHref: string,
    rawParams?: Record<string, StringNumberBoolean>,
  ): void {
    const { path, params } = Navigation.getPathTransformer()(
      rawHref,
      rawParams,
    );
    Navigation.handlers.push(path, params);
  }
}
