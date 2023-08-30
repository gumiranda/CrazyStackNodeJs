import { authLogged } from "@/application/infra/middlewares";
import {
  addRatingAdapter,
  loadRatingAdapter,
  deleteRatingAdapter,
  updateRatingAdapter,
  loadRatingByPageAdapter,
} from "./ratingAdapter";
import {
  addRatingPostSchema,
  loadRatingGetSchema,
  deleteRatingSchema,
  updateRatingSchema,
  loadRatingByPageGetSchema,
} from "./ratingSchema";

async function rating(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/rating/add", addRatingPostSchema, addRatingAdapter());
  fastify.get("/rating/load", loadRatingGetSchema, loadRatingAdapter());
  fastify.get("/rating/loadByPage", loadRatingByPageGetSchema, loadRatingByPageAdapter());
  fastify.delete("/rating/delete", deleteRatingSchema, deleteRatingAdapter());
  fastify.patch("/rating/update", updateRatingSchema, updateRatingAdapter());
}
export { rating };
