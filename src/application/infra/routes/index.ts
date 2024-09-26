import { health } from "./health";
import { auth } from "./auth";
import { account } from "./account";
import { category } from "./category";
// IMPORT MODULE FILES
import { photo } from "./photo";
import { transaction } from "./transaction";
import { charge } from "./charge";
import { subscription } from "./subscription";
import { customer } from "./customer";
import { routeDriver } from "./routeDriver";
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
import { webhooks } from "./webhooks";
import { uploadRoutes } from "./photo/uploadPhotoRouter";

const routes = [
  webhooks,
  health,
  auth,
  account,
  category,
  // ADD FUNCTION IMPORTS
  photo,
  transaction,
  charge,
  subscription,
  customer,
  routeDriver,
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
  uploadRoutes,
];

export { routes };
