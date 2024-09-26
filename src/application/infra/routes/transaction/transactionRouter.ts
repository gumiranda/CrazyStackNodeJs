import { authLogged } from "@/application/infra/middlewares";
import {
  loadTransactionAdapter,
  loadTransactionByPageAdapter,
} from "./transactionAdapter";
import {
  loadTransactionByPageGetSchema,
  loadTransactionGetSchema,
} from "./transactionSchema";

async function transaction(fastify: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.get("/transaction/load", loadTransactionGetSchema, loadTransactionAdapter());
  fastify.get(
    "/transaction/loadByPage",
    loadTransactionByPageGetSchema,
    loadTransactionByPageAdapter()
  );
}
export { transaction };
