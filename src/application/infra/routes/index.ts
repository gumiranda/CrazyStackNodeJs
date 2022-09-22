import { health } from "./health";
import { user } from "./user";
import { auth } from "./auth";
import { account } from "./account";
import { category } from "./category";
// IMPORT MODULE FILES
import { product } from "./product";
const routes = [
  health,
  user,
  auth,
  account,
  category,
  // ADD FUNCTION IMPORTS
product,
];

export { routes };
