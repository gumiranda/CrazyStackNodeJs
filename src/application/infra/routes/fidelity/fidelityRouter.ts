import { authLogged } from "@/application/infra/middlewares";
import {
  addFidelityAdapter,
  loadFidelityAdapter,
  deleteFidelityAdapter,
  updateFidelityAdapter,
  loadFidelityByPageAdapter,
} from "./fidelityAdapter";
import {
  addFidelityPostSchema,
  loadFidelityGetSchema,
  deleteFidelitySchema,
  updateFidelitySchema,
  loadFidelityByPageGetSchema,
} from "./fidelitySchema";

async function fidelity(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/fidelity/add", addFidelityPostSchema, addFidelityAdapter());
  fastify.get("/fidelity/load", loadFidelityGetSchema, loadFidelityAdapter());
  fastify.get(
    "/fidelity/loadByPage",
    loadFidelityByPageGetSchema,
    loadFidelityByPageAdapter()
  );
  fastify.delete("/fidelity/delete", deleteFidelitySchema, deleteFidelityAdapter());
  fastify.patch("/fidelity/update", updateFidelitySchema, updateFidelityAdapter());
}
export { fidelity };
