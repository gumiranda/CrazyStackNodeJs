import { refreshtokenLogged } from "@/application/infra/middlewares";
import { refreshAdapter } from "./accountAdapter";
import { refreshGetSchema } from "./accountSchema";

async function account(fastify: any, options: any) {
  fastify.addHook("preHandler", refreshtokenLogged());
  fastify.get("/account/refresh", refreshGetSchema, refreshAdapter());
}
export { account };
