import { loadCategoryPlaceByPageAdapter } from "../categoryPlace/categoryPlaceAdapter";
import { loadCategoryPlaceByPageGetSchema } from "../categoryPlace/categoryPlaceSchema";
import { loadOwnerAdapter, loadOwnerByPageAdapter } from "../owner/ownerAdapter";
import { loadOwnerByPageGetSchema, loadOwnerGetSchema } from "../owner/ownerSchema";
import { loadPlaceAdapter, loadPlaceByPageAdapter } from "../place/placeAdapter";
import { loadPlaceByPageGetSchema, loadPlaceGetSchema } from "../place/placeSchema";
import { loadServiceByPageAdapter } from "../service/serviceAdapter";
import { loadServiceByPageGetSchema } from "../service/serviceSchema";
import { loadUserByPageAdapter } from "../user/userAdapter";
import { loadUserByPageGetSchema } from "../user/userSchema";

async function publica(fastify: any) {
  fastify.get("/public/user/loadByPage", loadUserByPageGetSchema, loadUserByPageAdapter());
  fastify.get("/public/owner/load", loadOwnerGetSchema, loadOwnerAdapter());

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
  fastify.get(
    "/public/place/loadByPage",
    loadPlaceByPageGetSchema,
    loadPlaceByPageAdapter()
  );
  fastify.get("/public/place/load", loadPlaceGetSchema, loadPlaceAdapter());
  fastify.get(
    "/public/categoryPlace/loadByPage",
    loadCategoryPlaceByPageGetSchema,
    loadCategoryPlaceByPageAdapter()
  );
}
export { publica };
