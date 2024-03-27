import { authLogged } from "@/application/infra/middlewares";
import {
  addChargeAdapter,
  loadChargeAdapter,
  deleteChargeAdapter,
  updateChargeAdapter,
  loadChargeByPageAdapter,
} from "./chargeAdapter";
import {
  addChargePostSchema,
  loadChargeGetSchema,
  deleteChargeSchema,
  updateChargeSchema,
  loadChargeByPageGetSchema,
} from "./chargeSchema";

async function charge(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/charge/add", addChargePostSchema, addChargeAdapter());
  fastify.get("/charge/load", loadChargeGetSchema, loadChargeAdapter());
  fastify.get(
    "/charge/loadByPage",
    loadChargeByPageGetSchema,
    loadChargeByPageAdapter()
  );
  fastify.delete("/charge/delete", deleteChargeSchema, deleteChargeAdapter());
  fastify.patch("/charge/update", updateChargeSchema, updateChargeAdapter());
}
export { charge };
