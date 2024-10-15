import { authLogged } from "@/application/infra/middlewares";
import {
  addFollowAdapter,
  loadFollowAdapter,
  deleteFollowAdapter,
  updateFollowAdapter,
  loadFollowByPageAdapter,
} from "./followAdapter";
import {
  addFollowPostSchema,
  loadFollowGetSchema,
  deleteFollowSchema,
  updateFollowSchema,
  loadFollowByPageGetSchema,
} from "./followSchema";

async function follow(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/follow/add", addFollowPostSchema, addFollowAdapter());
  fastify.get("/follow/load", loadFollowGetSchema, loadFollowAdapter());
  fastify.get("/follow/loadByPage", loadFollowByPageGetSchema, loadFollowByPageAdapter());
  fastify.delete("/follow/delete", deleteFollowSchema, deleteFollowAdapter());
  fastify.patch("/follow/update", updateFollowSchema, updateFollowAdapter());
}
export { follow };
