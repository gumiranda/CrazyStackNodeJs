import { authLogged } from "@/application/infra/middlewares";
import {
  addPhotoAdapter,
  loadPhotoAdapter,
  deletePhotoAdapter,
  loadPhotoByPageAdapter,
} from "./photoAdapter";
import {
  addPhotoPostSchema,
  loadPhotoGetSchema,
  deletePhotoSchema,
  loadPhotoByPageGetSchema,
} from "./photoSchema";

async function photo(fastify: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/photo/add", addPhotoPostSchema, addPhotoAdapter());
  fastify.get("/photo/load", loadPhotoGetSchema, loadPhotoAdapter());
  fastify.get("/photo/loadByPage", loadPhotoByPageGetSchema, loadPhotoByPageAdapter());
  fastify.delete("/photo/delete", deletePhotoSchema, deletePhotoAdapter());
}
export { photo };
