import { health } from "./health";
import { auth } from "./auth";
import { account } from "./account";
import { category } from "./category";
// IMPORT MODULE FILES
import { appointment } from "./appointment";
import { ratingResult } from "./ratingResult";
import { rating } from "./rating";
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
appointment,
ratingResult,
rating,
owner,
  user,
  service,
  product,
];

export { routes };
