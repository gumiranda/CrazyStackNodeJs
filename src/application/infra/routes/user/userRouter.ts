import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addUserAdapter,
  loadUserAdapter,
  deleteUserAdapter,
  updateUserAdapter,
  loadUserByPageAdapter,
  loadUserByGeoNearAdapter,
} from "./userAdapter";

const user = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/user/add", addUserAdapter())
      .get("/user/load", loadUserAdapter())
      .get("/user/loadByPage", loadUserByPageAdapter())
      .get("/user/loadByGeoNear", loadUserByGeoNearAdapter())
      .delete("/user/delete", deleteUserAdapter())
      .patch("/user/update", updateUserAdapter())
  );

export { user };
