import { wooviWebhook } from "./paymentSchema";
import { addTransactionAdapter } from "../transaction/transactionAdapter";
import { wooviAuthWebhook } from "../../middlewares/wooviAuth";

async function webhooks(fastify: any) {
  fastify.addHook("preHandler", wooviAuthWebhook());
  fastify.post("/webhooks/add", wooviWebhook, addTransactionAdapter());
}
export { webhooks };
