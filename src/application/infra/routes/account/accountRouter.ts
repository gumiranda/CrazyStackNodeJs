import { refreshtokenLogged } from "@/application/infra/middlewares";
import { refreshAdapter, whoAmIAdapter } from "./accountAdapter";
import { refreshGetSchema, whoAmIGetSchema } from "./accountSchema";

async function account(fastify: any, options: any) {
  fastify.addHook("preHandler", refreshtokenLogged());
  fastify.get("/account/refresh", refreshGetSchema, refreshAdapter());
  fastify.get("/account/whoami", whoAmIGetSchema, whoAmIAdapter());
}
export { account };
