type PathTransformerReturn = {
  path: string;
  options: Record<string, unknown>;
};

export type PathTransformer = (
  rawPath: string,
  options?: PusherOptions,
) => PathTransformerReturn;

type Pusher = (href: PusherHref, options?: PusherOptions) => void;

export interface Handlers {
  push: Pusher;
}

export type PusherHref = string;
export type PusherOptions = Record<string, any>;
