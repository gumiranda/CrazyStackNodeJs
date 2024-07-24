import { authLogged } from "@/application/infra/middlewares";
import {
  addCustomerAdapter,
  loadCustomerAdapter,
  deleteCustomerAdapter,
  updateCustomerAdapter,
  loadCustomerByPageAdapter,
} from "./customerAdapter";
import {
  addCustomerPostSchema,
  loadCustomerGetSchema,
  deleteCustomerSchema,
  updateCustomerSchema,
  loadCustomerByPageGetSchema,
} from "./customerSchema";

async function customer(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/customer/add", addCustomerPostSchema, addCustomerAdapter());
  fastify.get("/customer/load", loadCustomerGetSchema, loadCustomerAdapter());
  fastify.get(
    "/customer/loadByPage",
    loadCustomerByPageGetSchema,
    loadCustomerByPageAdapter()
  );
  fastify.delete("/customer/delete", deleteCustomerSchema, deleteCustomerAdapter());
  fastify.patch("/customer/update", updateCustomerSchema, updateCustomerAdapter());
}
export { customer };
