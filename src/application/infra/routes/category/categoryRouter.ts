import { authLogged } from "@/application/infra/middlewares";
import {
  addCategoryAdapter,
  loadCategoryAdapter,
  deleteCategoryAdapter,
} from "./categoryAdapter";
import {
  addCategoryPostSchema,
  loadCategoryGetSchema,
  deleteCategorySchema,
} from "./categorySchema";

async function category(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/category/add", addCategoryPostSchema, addCategoryAdapter());
  fastify.get("/category/load", loadCategoryGetSchema, loadCategoryAdapter());
  fastify.delete("/category/delete", deleteCategorySchema, deleteCategoryAdapter());
}
export { category };
