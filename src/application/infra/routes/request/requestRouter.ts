import { authLogged } from "@/application/infra/middlewares";
import {
  addRequestAdapter,
  loadRequestAdapter,
  deleteRequestAdapter,
  updateRequestAdapter,
  loadRequestByPageAdapter,
} from "./requestAdapter";
import {
  addRequestPostSchema,
  loadRequestGetSchema,
  deleteRequestSchema,
  updateRequestSchema,
  loadRequestByPageGetSchema,
} from "./requestSchema";

async function request(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/request/add", addRequestPostSchema, addRequestAdapter());
  fastify.get("/request/load", loadRequestGetSchema, loadRequestAdapter());
  fastify.get(
    "/request/loadByPage",
    loadRequestByPageGetSchema,
    loadRequestByPageAdapter()
  );
  fastify.delete("/request/delete", deleteRequestSchema, deleteRequestAdapter());
  fastify.patch("/request/update", updateRequestSchema, updateRequestAdapter());
}
export { request };
