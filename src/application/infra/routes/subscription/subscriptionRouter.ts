import { authLogged } from "@/application/infra/middlewares";
import {
  addSubscriptionAdapter,
  loadSubscriptionAdapter,
  deleteSubscriptionAdapter,
  updateSubscriptionAdapter,
  loadSubscriptionByPageAdapter,
} from "./subscriptionAdapter";
import {
  addSubscriptionPostSchema,
  loadSubscriptionGetSchema,
  deleteSubscriptionSchema,
  updateSubscriptionSchema,
  loadSubscriptionByPageGetSchema,
} from "./subscriptionSchema";

async function subscription(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/subscription/add", addSubscriptionPostSchema, addSubscriptionAdapter());
  fastify.get("/subscription/load", loadSubscriptionGetSchema, loadSubscriptionAdapter());
  fastify.get(
    "/subscription/loadByPage",
    loadSubscriptionByPageGetSchema,
    loadSubscriptionByPageAdapter()
  );
  fastify.delete("/subscription/delete", deleteSubscriptionSchema, deleteSubscriptionAdapter());
  fastify.patch("/subscription/update", updateSubscriptionSchema, updateSubscriptionAdapter());
}
export { subscription };
