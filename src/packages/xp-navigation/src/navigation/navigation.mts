import type {
  Handlers,
  PathTransformer,
  PusherOptions,
  Logger,
} from "./navigation.types.mts";

export class Navigation {
  static handlers: Handlers = {
    push: () => {
      throw new Error("Navigation.push used before being defined");
    },
  };
  static pathTransformer: PathTransformer | undefined;
  static logger: Logger | undefined;

  static setHandlers(handlers: Handlers) {
    Navigation.handlers = handlers;
  }

  static setLogger(logger: Logger): void {
    Navigation.logger = logger;
  }

  static log(...logParams: Parameters<Logger>): void {
    Navigation.logger && Navigation.logger(...logParams);
  }

  static setPathTransformer(transformer: PathTransformer): void {
    Navigation.pathTransformer = transformer;
  }

  static getPathTransformer(): PathTransformer {
    if (!Navigation.pathTransformer) {
      throw new Error("PathTransformer not defined");
    }
    return Navigation.pathTransformer;
  }

  static push(
    rawHref: typeof Navigation.handlers.push,
    rawParams?: PusherOptions,
  ): void {
    const { path, params } = Navigation.getPathTransformer()(
      rawHref,
      rawParams,
    );
    Navigation.log({ path, params, rawParams, rawHref });
    Navigation.handlers.push(path, params);
  }
}
