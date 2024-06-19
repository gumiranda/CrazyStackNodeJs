import { authLogged } from "@/application/infra/middlewares";
import {
  addMapRouteAdapter,
  loadMapRouteAdapter,
  deleteMapRouteAdapter,
  updateMapRouteAdapter,
  loadMapRouteByPageAdapter,
  loadDirectionsAdapter,
  loadPlacesAdapter,
} from "./mapRouteAdapter";
import {
  addMapRoutePostSchema,
  loadMapRouteGetSchema,
  deleteMapRouteSchema,
  updateMapRouteSchema,
  loadMapRouteByPageGetSchema,
  loadDirectionsGetSchema,
  loadPlacesGetSchema,
} from "./mapRouteSchema";
import { onSendRedis, preHandlerRedis } from "../../redis";
import { env } from "../../config";

async function mapRoute(fastify: any) {
  fastify.addHook("preHandler", authLogged());
  if (env.environment === "production") {
    fastify.addHook(
      "preHandler",
      preHandlerRedis("mapRoute", ["load", "loadByPage", "directions", "places"])
    );
    fastify.addHook(
      "onSend",
      onSendRedis("mapRoute", 60 * 60, ["load", "loadByPage", "directions", "places"])
    );
  }
  fastify.post("/mapRoute/add", addMapRoutePostSchema, addMapRouteAdapter());
  fastify.get("/mapRoute/load", loadMapRouteGetSchema, loadMapRouteAdapter());
  fastify.get("/mapRoute/directions", loadDirectionsGetSchema, loadDirectionsAdapter());
  fastify.get("/mapRoute/places", loadPlacesGetSchema, loadPlacesAdapter());
  fastify.get(
    "/mapRoute/loadByPage",
    loadMapRouteByPageGetSchema,
    loadMapRouteByPageAdapter()
  );
  fastify.delete("/mapRoute/delete", deleteMapRouteSchema, deleteMapRouteAdapter());
  fastify.patch("/mapRoute/update", updateMapRouteSchema, updateMapRouteAdapter());
}
export { mapRoute };
