import type {
  Handlers,
  PathTransformer,
  PusherHref,
  PusherOptions,
} from "./navigation.types.mts";

export class Navigation {
  static handlers: Handlers = {
    push: () => {
      throw new Error("Navigation.push used before being defined");
    },
  };
  static pathTransformer: PathTransformer | undefined;

  static setHandlers(handlers: Handlers) {
    Navigation.handlers = handlers;
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

  static push(rawHref: PusherHref, rawOptions?: PusherOptions): void {
    const { path, options } = Navigation.getPathTransformer()(
      rawHref,
      rawOptions,
    );
    console.log({ path, options, rawOptions, rawHref });
    Navigation.handlers.push(path, options);
  }
}
