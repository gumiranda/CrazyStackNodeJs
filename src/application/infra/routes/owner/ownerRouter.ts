import { authLogged } from "@/application/infra/middlewares";
import {
  addOwnerAdapter,
  loadOwnerAdapter,
  deleteOwnerAdapter,
  updateOwnerAdapter,
  loadOwnerByPageAdapter,
} from "./ownerAdapter";
import {
  addOwnerPostSchema,
  loadOwnerGetSchema,
  deleteOwnerSchema,
  updateOwnerSchema,
  loadOwnerByPageGetSchema,
} from "./ownerSchema";

async function owner(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/owner/add", addOwnerPostSchema, addOwnerAdapter());
  fastify.get("/owner/load", loadOwnerGetSchema, loadOwnerAdapter());
  fastify.get("/owner/loadByPage", loadOwnerByPageGetSchema, loadOwnerByPageAdapter());
  fastify.delete("/owner/delete", deleteOwnerSchema, deleteOwnerAdapter());
  fastify.patch("/owner/update", updateOwnerSchema, updateOwnerAdapter());
}
export { owner };
