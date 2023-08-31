import { authLogged } from "@/application/infra/middlewares";
import {
  addRouteDriverAdapter,
  loadRouteDriverAdapter,
  deleteRouteDriverAdapter,
  updateRouteDriverAdapter,
  loadRouteDriverByPageAdapter,
} from "./routeDriverAdapter";
import {
  addRouteDriverPostSchema,
  loadRouteDriverGetSchema,
  deleteRouteDriverSchema,
  updateRouteDriverSchema,
  loadRouteDriverByPageGetSchema,
} from "./routeDriverSchema";

async function routeDriver(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/routeDriver/add", addRouteDriverPostSchema, addRouteDriverAdapter());
  fastify.get("/routeDriver/load", loadRouteDriverGetSchema, loadRouteDriverAdapter());
  fastify.get(
    "/routeDriver/loadByPage",
    loadRouteDriverByPageGetSchema,
    loadRouteDriverByPageAdapter()
  );
  fastify.delete(
    "/routeDriver/delete",
    deleteRouteDriverSchema,
    deleteRouteDriverAdapter()
  );
  fastify.patch(
    "/routeDriver/update",
    updateRouteDriverSchema,
    updateRouteDriverAdapter()
  );
}
export { routeDriver };
