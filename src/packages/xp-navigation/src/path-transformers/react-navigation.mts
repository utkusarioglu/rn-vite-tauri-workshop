import type { PathTransformer } from "../navigation/navigation.types.mts";
import { parseHash, parseSearchParamStr } from "package--url-parser";

export function reactNavigationPathTransformerFactory(
  webAppUrl: string,
  emptyPathAssignment: string,
): PathTransformer {
  const reactNavigationPathTransformer: PathTransformer = (
    rawPath,
    rawParams = {},
  ) => {
    let withoutOrigin = rawPath.replace(webAppUrl, "");
    const withoutPrecedingSlash = withoutOrigin.replace(/^\//, "");
    const [path, searchParamsStr, rawHash] =
      withoutPrecedingSlash.split(/[\?|#]/);

    const hash = parseHash(rawParams, rawHash);
    const searchParams = parseSearchParamStr(searchParamsStr, rawParams);

    const params = {
      ...rawParams,
      ...searchParams,
      ...{ hash },
    };

    if (!path.length) {
      return { path: emptyPathAssignment, params };
    }

    return {
      path,
      params,
    };
  };

  return reactNavigationPathTransformer;
}
