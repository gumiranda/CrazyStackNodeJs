import { authLogged } from "@/application/infra/middlewares";
import {
  addOrderAdapter,
  loadOrderAdapter,
  deleteOrderAdapter,
  updateOrderAdapter,
  loadOrderByPageAdapter,
} from "./orderAdapter";
import {
  addOrderPostSchema,
  loadOrderGetSchema,
  deleteOrderSchema,
  updateOrderSchema,
  loadOrderByPageGetSchema,
} from "./orderSchema";

async function order(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/order/add", addOrderPostSchema, addOrderAdapter());
  fastify.get("/order/load", loadOrderGetSchema, loadOrderAdapter());
  fastify.get("/order/loadByPage", loadOrderByPageGetSchema, loadOrderByPageAdapter());
  fastify.delete("/order/delete", deleteOrderSchema, deleteOrderAdapter());
  fastify.patch("/order/update", updateOrderSchema, updateOrderAdapter());
}
export { order };
