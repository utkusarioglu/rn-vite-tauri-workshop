import type { PathTransformer } from "../navigation/navigation.types.mts";
import {
  parseHash,
  parseUrlSearchParamStrAsObject,
  mergeParams,
} from "package--url-parser";

export function reactNavigationPathTransformerFactory<T extends string>(
  webAppUrl: string,
  emptyPathAssignment: T,
): PathTransformer {
  const reactNavigationPathTransformer: PathTransformer = (
    rawPath,
    rawParams = {},
  ) => {
    let withoutOrigin = rawPath.replace(webAppUrl, "");
    const withoutPrecedingSlash = withoutOrigin.replace(/^\//, "");
    const [urlPath, searchParamsStr, rawHash] =
      withoutPrecedingSlash.split(/[\?|#]/);

    const hash = parseHash(rawHash);
    const searchParams = parseUrlSearchParamStrAsObject(searchParamsStr);
    const params = mergeParams(searchParams, rawParams, hash, "throw");
    const path = !urlPath.length ? emptyPathAssignment : urlPath;

    return { path, params };
  };

  return reactNavigationPathTransformer;
}
