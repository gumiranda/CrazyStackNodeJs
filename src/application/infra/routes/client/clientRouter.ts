import { authLogged } from "@/application/infra/middlewares";
import {
  addClientAdapter,
  loadClientAdapter,
  deleteClientAdapter,
  updateClientAdapter,
  loadClientByPageAdapter,
} from "./clientAdapter";
import {
  addClientPostSchema,
  loadClientGetSchema,
  deleteClientSchema,
  updateClientSchema,
  loadClientByPageGetSchema,
} from "./clientSchema";

async function client(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/client/add", addClientPostSchema, addClientAdapter());
  fastify.get("/client/load", loadClientGetSchema, loadClientAdapter());
  fastify.get("/client/loadByPage", loadClientByPageGetSchema, loadClientByPageAdapter());
  fastify.delete("/client/delete", deleteClientSchema, deleteClientAdapter());
  fastify.patch("/client/update", updateClientSchema, updateClientAdapter());
}
export { client };
