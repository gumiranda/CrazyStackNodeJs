import { authLogged } from "@/application/infra/middlewares";
import {
  addMapRouteAdapter,
  loadMapRouteAdapter,
  deleteMapRouteAdapter,
  updateMapRouteAdapter,
  loadMapRouteByPageAdapter,
} from "./mapRouteAdapter";
import {
  addMapRoutePostSchema,
  loadMapRouteGetSchema,
  deleteMapRouteSchema,
  updateMapRouteSchema,
  loadMapRouteByPageGetSchema,
} from "./mapRouteSchema";

async function mapRoute(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/mapRoute/add", addMapRoutePostSchema, addMapRouteAdapter());
  fastify.get("/mapRoute/load", loadMapRouteGetSchema, loadMapRouteAdapter());
  fastify.get(
    "/mapRoute/loadByPage",
    loadMapRouteByPageGetSchema,
    loadMapRouteByPageAdapter()
  );
  fastify.delete("/mapRoute/delete", deleteMapRouteSchema, deleteMapRouteAdapter());
  fastify.patch("/mapRoute/update", updateMapRouteSchema, updateMapRouteAdapter());
}
export { mapRoute };
