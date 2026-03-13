import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addRequestAdapter,
  loadRequestAdapter,
  deleteRequestAdapter,
  updateRequestAdapter,
  loadRequestByPageAdapter,
} from "./requestAdapter";

const request = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/request/add", addRequestAdapter())
      .get("/request/load", loadRequestAdapter())
      .get("/request/loadByPage", loadRequestByPageAdapter())
      .delete("/request/delete", deleteRequestAdapter())
      .patch("/request/update", updateRequestAdapter())
  );

export { request };
