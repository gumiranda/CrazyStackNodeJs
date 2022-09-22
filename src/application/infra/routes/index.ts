import { health } from "./health";
import { auth } from "./auth";
import { account } from "./account";
import { category } from "./category";
// IMPORT MODULE FILES
import { owner } from "./owner";
import { user } from "./user";
import { service } from "./service";
import { product } from "./product";
const routes = [
  health,
  auth,
  account,
  category,
  // ADD FUNCTION IMPORTS
owner,
  user,
  service,
  product,
];

export { routes };
