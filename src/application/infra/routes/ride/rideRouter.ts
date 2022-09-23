import { authLogged } from "@/application/infra/middlewares";
import {
  addRideAdapter,
  loadRideAdapter,
  deleteRideAdapter,
  updateRideAdapter,
  loadRideByPageAdapter,
} from "./rideAdapter";
import {
  addRidePostSchema,
  loadRideGetSchema,
  deleteRideSchema,
  updateRideSchema,
  loadRideByPageGetSchema,
} from "./rideSchema";

async function ride(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/ride/add", addRidePostSchema, addRideAdapter());
  fastify.get("/ride/load", loadRideGetSchema, loadRideAdapter());
  fastify.get(
    "/ride/loadByPage",
    loadRideByPageGetSchema,
    loadRideByPageAdapter()
  );
  fastify.delete("/ride/delete", deleteRideSchema, deleteRideAdapter());
  fastify.patch("/ride/update", updateRideSchema, updateRideAdapter());
}
export { ride };
