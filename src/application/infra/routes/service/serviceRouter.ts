import { authLogged } from "@/application/infra/middlewares";
import {
  addServiceAdapter,
  loadServiceAdapter,
  deleteServiceAdapter,
  updateServiceAdapter,
  loadServiceByPageAdapter,
} from "./serviceAdapter";
import {
  addServicePostSchema,
  loadServiceGetSchema,
  deleteServiceSchema,
  updateServiceSchema,
  loadServiceByPageGetSchema,
} from "./serviceSchema";

async function service(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/service/add", addServicePostSchema, addServiceAdapter());
  fastify.get("/service/load", loadServiceGetSchema, loadServiceAdapter());
  fastify.get(
    "/service/loadByPage",
    loadServiceByPageGetSchema,
    loadServiceByPageAdapter()
  );
  fastify.delete("/service/delete", deleteServiceSchema, deleteServiceAdapter());
  fastify.patch("/service/update", updateServiceSchema, updateServiceAdapter());
}
export { service };
