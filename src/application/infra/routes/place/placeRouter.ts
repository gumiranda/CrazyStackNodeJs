import { authLogged } from "@/application/infra/middlewares";
import {
  addPlaceAdapter,
  loadPlaceAdapter,
  deletePlaceAdapter,
  updatePlaceAdapter,
  loadPlaceByPageAdapter,
  loadPlaceByGeoNearAdapter,
} from "./placeAdapter";
import {
  addPlacePostSchema,
  loadPlaceGetSchema,
  deletePlaceSchema,
  updatePlaceSchema,
  loadPlaceByPageGetSchema,
  loadPlaceByGeoNearSchema,
} from "./placeSchema";

async function place(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/place/add", addPlacePostSchema, addPlaceAdapter());
  fastify.get("/place/load", loadPlaceGetSchema, loadPlaceAdapter());
  fastify.get("/place/loadByPage", loadPlaceByPageGetSchema, loadPlaceByPageAdapter());
  fastify.delete("/place/delete", deletePlaceSchema, deletePlaceAdapter());
  fastify.patch("/place/update", updatePlaceSchema, updatePlaceAdapter());
  fastify.get(
    "/place/loadByGeoNear",
    loadPlaceByGeoNearSchema,
    loadPlaceByGeoNearAdapter()
  );
}
export { place };
