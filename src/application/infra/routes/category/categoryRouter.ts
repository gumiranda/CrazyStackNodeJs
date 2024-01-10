import { authLogged } from "@/application/infra/middlewares";
import {
  addCategoryAdapter,
  loadCategoryAdapter,
  deleteCategoryAdapter,
  updateCategoryAdapter,
  loadCategoryByPageAdapter,
} from "./categoryAdapter";
import {
  addCategoryPostSchema,
  loadCategoryGetSchema,
  deleteCategorySchema,
  updateCategorySchema,
  loadCategoryByPageGetSchema,
} from "./categorySchema";

async function category(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/category/add", addCategoryPostSchema, addCategoryAdapter());
  fastify.get("/category/load", loadCategoryGetSchema, loadCategoryAdapter());
  fastify.get(
    "/category/loadByPage",
    loadCategoryByPageGetSchema,
    loadCategoryByPageAdapter()
  );
  fastify.delete("/category/delete", deleteCategorySchema, deleteCategoryAdapter());
  fastify.patch("/category/update", updateCategorySchema, updateCategoryAdapter());
}
export { category };
