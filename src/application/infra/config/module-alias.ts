import { addAlias } from "module-alias";
import { resolve } from "path";

addAlias("@", resolve(process.env.TS_NODE_ENV === undefined ? "dist" : "src"));
