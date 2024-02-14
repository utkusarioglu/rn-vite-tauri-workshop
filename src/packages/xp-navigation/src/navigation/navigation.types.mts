import type { StringNumberBoolean } from "package--url-parser";

export type PathTransformerReturn = {
  path: string;
  params: Record<string, StringNumberBoolean>;
};

export type PathTransformer = (
  rawPath: string,
  params?: PusherOptions,
) => PathTransformerReturn;

export type PathTransformerParams = Parameters<PathTransformer>;

type Pusher = (href: string, params?: PusherOptions) => void;

export interface Handlers {
  push: Pusher;
}

// export type PusherHref = string;
export type PusherOptions = Record<string, StringNumberBoolean>;

// TODO this type need to be corrected once the logging infrastructure is in
// place
export type Logger = (log: any) => void;
