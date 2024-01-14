import { join } from "node:path";

export const resolveAliasesFactory = (rootPath) => [
  {
    find: /^#hocs\//,
    replacement: join(rootPath, "src/components/hocs/"),
  },
  {
    find: /^#layouts\//,
    replacement: join(rootPath, "src/components/layouts/"),
  },
  {
    find: /^#screens/,
    replacement: join(rootPath, "src/components/screens/"),
  },
  {
    find: /^#styles\//,
    replacement: join(rootPath, "src/styles/"),
  },
  {
    find: /^#\//,
    replacement: `${rootPath}/`,
  },
];
