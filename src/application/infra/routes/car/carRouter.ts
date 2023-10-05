import { authLogged } from "@/application/infra/middlewares";
import {
  addCarAdapter,
  loadCarAdapter,
  deleteCarAdapter,
  updateCarAdapter,
  loadCarByPageAdapter,
} from "./carAdapter";
import {
  addCarPostSchema,
  loadCarGetSchema,
  deleteCarSchema,
  updateCarSchema,
  loadCarByPageGetSchema,
} from "./carSchema";

async function car(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/car/add", addCarPostSchema, addCarAdapter());
  fastify.get("/car/load", loadCarGetSchema, loadCarAdapter());
  fastify.get("/car/loadByPage", loadCarByPageGetSchema, loadCarByPageAdapter());
  fastify.delete("/car/delete", deleteCarSchema, deleteCarAdapter());
  fastify.patch("/car/update", updateCarSchema, updateCarAdapter());
}
export { car };
