import { authLogged } from "@/application/infra/middlewares";
import { addCategoryAdapter } from "./categoryAdapter";
import { addCategoryPostSchema } from "./categorySchema";

async function category(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/category/add", addCategoryPostSchema, addCategoryAdapter());
}
export { category };
