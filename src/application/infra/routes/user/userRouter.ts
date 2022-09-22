import { authLogged } from "@/application/infra/middlewares";
import {
  addUserAdapter,
  loadUserAdapter,
  deleteUserAdapter,
  updateUserAdapter,
  loadUserByPageAdapter,
} from "./userAdapter";
import {
  addUserPostSchema,
  loadUserGetSchema,
  deleteUserSchema,
  updateUserSchema,
  loadUserByPageGetSchema,
} from "./userSchema";

async function user(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/user/add", addUserPostSchema, addUserAdapter());
  fastify.get("/user/load", loadUserGetSchema, loadUserAdapter());
  fastify.get(
    "/user/loadByPage",
    loadUserByPageGetSchema,
    loadUserByPageAdapter()
  );
  fastify.delete("/user/delete", deleteUserSchema, deleteUserAdapter());
  fastify.patch("/user/update", updateUserSchema, updateUserAdapter());
}
export { user };
