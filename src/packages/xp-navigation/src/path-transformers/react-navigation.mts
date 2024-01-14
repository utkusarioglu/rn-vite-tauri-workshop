import type { PathTransformer } from "../navigation/navigation.types.mts";
import { parseHash, parseSearchParamStr } from "package--url-parser";

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
    const [path, searchParamsStr, rawHash] =
      withoutPrecedingSlash.split(/[\?|#]/);

    const hash = parseHash(rawParams, rawHash, "throw");
    const searchParams = parseSearchParamStr(
      searchParamsStr,
      rawParams,
      "throw",
    );

    const params = {
      ...rawParams,
      ...searchParams,
    };

    if (hash) {
      params.hash = hash;
    }

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
