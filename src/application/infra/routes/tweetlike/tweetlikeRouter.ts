import { authLogged } from "@/application/infra/middlewares";
import {
  addTweetlikeAdapter,
  loadTweetlikeAdapter,
  deleteTweetlikeAdapter,
  updateTweetlikeAdapter,
  loadTweetlikeByPageAdapter,
} from "./tweetlikeAdapter";
import {
  addTweetlikePostSchema,
  loadTweetlikeGetSchema,
  deleteTweetlikeSchema,
  updateTweetlikeSchema,
  loadTweetlikeByPageGetSchema,
} from "./tweetlikeSchema";

async function tweetlike(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/tweetlike/add", addTweetlikePostSchema, addTweetlikeAdapter());
  fastify.get("/tweetlike/load", loadTweetlikeGetSchema, loadTweetlikeAdapter());
  fastify.get(
    "/tweetlike/loadByPage",
    loadTweetlikeByPageGetSchema,
    loadTweetlikeByPageAdapter()
  );
  fastify.delete("/tweetlike/delete", deleteTweetlikeSchema, deleteTweetlikeAdapter());
  fastify.patch("/tweetlike/update", updateTweetlikeSchema, updateTweetlikeAdapter());
}
export { tweetlike };
