import { authLogged } from "@/application/infra/middlewares";
import { addCategoryAdapter, loadCategoryAdapter } from "./categoryAdapter";
import { addCategoryPostSchema, loadCategoryGetSchema } from "./categorySchema";

async function category(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/category/add", addCategoryPostSchema, addCategoryAdapter());
  fastify.get("/category/load", loadCategoryGetSchema, loadCategoryAdapter());
}
export { category };
