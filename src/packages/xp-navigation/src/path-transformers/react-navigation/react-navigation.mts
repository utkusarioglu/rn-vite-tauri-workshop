import type { PathTransformer } from "../../navigation/navigation.types.mts";
import {
  parseHash,
  parseUrlSearchParamStrAsObject,
  mergeParams,
} from "package--url-parser";

/**
 * Provides an instance for routing using "ReactNavigation" by converting
 * xp-app paths to values that the library can understand. For most use cases,
 * providing this path transformer should be sufficient for satisfactory
 * routing.
 *
 * @param webAppUrl Website url for the web app
 * @param emptyPathAssignment Homepage path. This is the path the factory will
 * route to when the given path is `/`.
 *
 * @returns A path transformer that converts from xp-app to "ReactNavigation".
 */
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
