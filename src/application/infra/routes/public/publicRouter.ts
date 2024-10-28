import { loadOwnerByPageAdapter } from "../owner/ownerAdapter";
import { loadOwnerByPageGetSchema } from "../owner/ownerSchema";
import { loadServiceByPageAdapter } from "../service/serviceAdapter";
import { loadServiceByPageGetSchema } from "../service/serviceSchema";
import { loadUserByPageAdapter } from "../user/userAdapter";
import { loadUserByPageGetSchema } from "../user/userSchema";

async function publica(fastify: any) {
  fastify.get("/public/user/loadByPage", loadUserByPageGetSchema, loadUserByPageAdapter());
  fastify.get(
    "/public/owner/loadByPage",
    loadOwnerByPageGetSchema,
    loadOwnerByPageAdapter()
  );
  fastify.get(
    "/public/service/loadByPage",
    loadServiceByPageGetSchema,
    loadServiceByPageAdapter()
  );
}
export { publica };
