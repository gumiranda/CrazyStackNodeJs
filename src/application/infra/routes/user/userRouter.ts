import { authLogged } from "@/application/infra/middlewares";
import {
  addUserAdapter,
  loadUserAdapter,
  deleteUserAdapter,
  updateUserAdapter,
  loadUserByPageAdapter,
  loadUserByGeoNearAdapter,
} from "./userAdapter";
import {
  addUserPostSchema,
  loadUserGetSchema,
  deleteUserSchema,
  updateUserSchema,
  loadUserByPageGetSchema,
  loadUserByGeoNearSchema,
} from "./userSchema";
import { onSendRedis, preHandlerRedis } from "../redis";
async function user(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.addHook("preHandler", preHandlerRedis());
  fastify.addHook("onSend", onSendRedis());
  fastify.post("/user/add", addUserPostSchema, addUserAdapter());
  fastify.get("/user/load", loadUserGetSchema, loadUserAdapter());
  fastify.get("/user/loadByPage", loadUserByPageGetSchema, loadUserByPageAdapter());
  fastify.get("/user/loadByGeoNear", loadUserByGeoNearSchema, loadUserByGeoNearAdapter());
  fastify.delete("/user/delete", deleteUserSchema, deleteUserAdapter());
  fastify.patch("/user/update", updateUserSchema, updateUserAdapter());
}
export { user };
