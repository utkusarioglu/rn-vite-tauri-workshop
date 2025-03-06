import { jestConfigFactory } from "config--jest";
import tsConfig from "./tsconfig.json" assert { type: "json" };

export default jestConfigFactory(tsConfig);
