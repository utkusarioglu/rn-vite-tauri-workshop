import type { PathTransformer } from "../navigation/navigation.types.mts";

// TODO remove `any`
export function browserPathTransformer(
  rawPath: string,
  rawParams: any = {},
): ReturnType<PathTransformer> {
  const url = new URL([window.location.origin, rawPath].join(""));

  if (url.hash && rawParams.hash) {
    // TODO standardize the error
    throw new Error("Hash defined twice");
  } else if (!url.hash && rawParams.hash) {
    url.hash = rawParams.hash;
    delete rawParams.hash;
  }

  Object.entries(rawParams).forEach(([key, value]) => {
    // @ts-expect-error: this needs proper typing as the rest of the function
    url.searchParams.set(key, value);
  });

  return {
    path: url.pathname + url.search + url.hash,
    params: rawParams,
  };
}
