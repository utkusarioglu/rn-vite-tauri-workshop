type PathTransformerReturn = {
  path: string;
  params: Record<string, unknown>;
};

export type PathTransformer = (
  rawPath: string,
  params?: PusherOptions,
) => PathTransformerReturn;

type Pusher = (href: PusherHref, params?: PusherOptions) => void;

export interface Handlers {
  push: Pusher;
}

export type PusherHref = string;
export type PusherOptions = Record<string, any>;
