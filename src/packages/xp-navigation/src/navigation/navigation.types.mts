export type PathTransformerReturn = {
  path: string;
  params: Record<string, unknown>;
};

export type PathTransformer = (
  rawPath: string,
  params?: PusherOptions,
) => PathTransformerReturn;

export type PathTransformerParams = Parameters<PathTransformer>;

type Pusher<PusherHref extends string> = (
  href: PusherHref,
  params?: PusherOptions,
) => void;

export interface Handlers<PusherHref extends string> {
  push: Pusher<PusherHref>;
}

// export type PusherHref = string;
export type PusherOptions = Record<string, any>;

// TODO this type need to be corrected once the logging infrastructure is in
// place
export type Logger = (log: any) => void;
