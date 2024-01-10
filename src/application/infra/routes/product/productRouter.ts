import { authLogged } from "@/application/infra/middlewares";
import {
  addProductAdapter,
  loadProductAdapter,
  deleteProductAdapter,
  updateProductAdapter,
  loadProductByPageAdapter,
} from "./productAdapter";
import {
  addProductPostSchema,
  loadProductGetSchema,
  deleteProductSchema,
  updateProductSchema,
  loadProductByPageGetSchema,
} from "./productSchema";

async function product(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/product/add", addProductPostSchema, addProductAdapter());
  fastify.get("/product/load", loadProductGetSchema, loadProductAdapter());
  fastify.get(
    "/product/loadByPage",
    loadProductByPageGetSchema,
    loadProductByPageAdapter()
  );
  fastify.delete("/product/delete", deleteProductSchema, deleteProductAdapter());
  fastify.patch("/product/update", updateProductSchema, updateProductAdapter());
}
export { product };
