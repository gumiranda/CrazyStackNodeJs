import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addPhotoAdapter,
  loadPhotoAdapter,
  deletePhotoAdapter,
  loadPhotoByPageAdapter,
} from "./photoAdapter";

const photo = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/photo/add", addPhotoAdapter())
      .get("/photo/load", loadPhotoAdapter())
      .get("/photo/loadByPage", loadPhotoByPageAdapter())
      .delete("/photo/delete", deletePhotoAdapter())
  );

export { photo };
