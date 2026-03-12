import { health } from "./health";
import { auth } from "./auth";
import { category } from "./category";
import { photo } from "./photo";
import { request } from "./request";
import { appointment } from "./appointment";
import { owner } from "./owner";
import { user } from "./user";
import { service } from "./service";
import { publica } from "./public";
import { uploadRoutes } from "./photo/uploadPhotoRouter";

const routes = [
  health,
  auth,
  category,
  photo,
  request,
  appointment,
  owner,
  user,
  service,
  uploadRoutes,
  publica,
];

export { routes };
