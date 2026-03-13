import { Elysia } from "elysia";
import { authLogged } from "@/application/infra/middlewares";
import {
  addOwnerAdapter,
  loadOwnerAdapter,
  deleteOwnerAdapter,
  updateOwnerAdapter,
  loadOwnerByPageAdapter,
} from "./ownerAdapter";

const owner = new Elysia()
  .state("userId", null as string | null)
  .state("userLogged", null as any)
  .state("daysToNextPayment", null as any)
  .guard({ beforeHandle: [authLogged()] }, (app) =>
    app
      .post("/owner/add", addOwnerAdapter())
      .get("/owner/load", loadOwnerAdapter())
      .get("/owner/loadByPage", loadOwnerByPageAdapter())
      .delete("/owner/delete", deleteOwnerAdapter())
      .patch("/owner/update", updateOwnerAdapter())
  );

export { owner };
