import { Elysia } from "elysia";
import { loadOwnerAdapter, loadOwnerByPageAdapter } from "../owner/ownerAdapter";
import { loadServiceByPageAdapter } from "../service/serviceAdapter";
import { loadUserByPageAdapter } from "../user/userAdapter";

const publica = new Elysia()
  .get("/public/user/loadByPage", loadUserByPageAdapter())
  .get("/public/owner/load", loadOwnerAdapter())
  .get("/public/owner/loadByPage", loadOwnerByPageAdapter())
  .get("/public/service/loadByPage", loadServiceByPageAdapter());

export { publica };
