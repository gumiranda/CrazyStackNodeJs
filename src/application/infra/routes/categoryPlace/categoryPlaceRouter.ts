import { authLogged } from "@/application/infra/middlewares";
import {
  addCategoryPlaceAdapter,
  loadCategoryPlaceAdapter,
  deleteCategoryPlaceAdapter,
  updateCategoryPlaceAdapter,
  loadCategoryPlaceByPageAdapter,
} from "./categoryPlaceAdapter";
import {
  addCategoryPlacePostSchema,
  loadCategoryPlaceGetSchema,
  deleteCategoryPlaceSchema,
  updateCategoryPlaceSchema,
  loadCategoryPlaceByPageGetSchema,
} from "./categoryPlaceSchema";

async function categoryPlace(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/categoryPlace/add", addCategoryPlacePostSchema, addCategoryPlaceAdapter());
  fastify.get("/categoryPlace/load", loadCategoryPlaceGetSchema, loadCategoryPlaceAdapter());
  fastify.get(
    "/categoryPlace/loadByPage",
    loadCategoryPlaceByPageGetSchema,
    loadCategoryPlaceByPageAdapter()
  );
  fastify.delete("/categoryPlace/delete", deleteCategoryPlaceSchema, deleteCategoryPlaceAdapter());
  fastify.patch("/categoryPlace/update", updateCategoryPlaceSchema, updateCategoryPlaceAdapter());
}
export { categoryPlace };
