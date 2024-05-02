import { authLogged } from "@/application/infra/middlewares";
import {
  addTransactionAdapter,
  loadTransactionAdapter,
  deleteTransactionAdapter,
  updateTransactionAdapter,
  loadTransactionByPageAdapter,
} from "./transactionAdapter";
import {
  addTransactionPostSchema,
  loadTransactionGetSchema,
  deleteTransactionSchema,
  updateTransactionSchema,
  loadTransactionByPageGetSchema,
} from "./transactionSchema";

async function transaction(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/transaction/add", addTransactionPostSchema, addTransactionAdapter());
  fastify.get("/transaction/load", loadTransactionGetSchema, loadTransactionAdapter());
  fastify.get(
    "/transaction/loadByPage",
    loadTransactionByPageGetSchema,
    loadTransactionByPageAdapter()
  );
  fastify.delete("/transaction/delete", deleteTransactionSchema, deleteTransactionAdapter());
  fastify.patch("/transaction/update", updateTransactionSchema, updateTransactionAdapter());
}
export { transaction };
