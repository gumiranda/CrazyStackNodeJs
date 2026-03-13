import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addServiceAdapter,
  loadServiceAdapter,
  deleteServiceAdapter,
  updateServiceAdapter,
  loadServiceByPageAdapter,
} from "./serviceAdapter";

const service = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/service/add", addServiceAdapter())
      .get("/service/load", loadServiceAdapter())
      .get("/service/loadByPage", loadServiceByPageAdapter())
      .delete("/service/delete", deleteServiceAdapter())
      .patch("/service/update", updateServiceAdapter())
  );

export { service };
