import { health } from "./health";
import { auth } from "./auth";
import { account } from "./account";
import { category } from "./category";
// IMPORT MODULE FILES
import { mapRoute } from "./mapRoute";
import { client } from "./client";
import { fidelity } from "./fidelity";
import { order } from "./order";
import { recurrence } from "./recurrence";
import { ride } from "./ride";
import { request } from "./request";
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
  mapRoute,
  client,
  fidelity,
  order,
  recurrence,
  ride,
  request,
  appointment,
  ratingResult,
  rating,
  owner,
  user,
  service,
  product,
];

export { routes };
