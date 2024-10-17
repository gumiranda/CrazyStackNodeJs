import { authLogged } from "@/application/infra/middlewares";
import {
  toggleTweetlikeAdapter,
  loadTweetlikeAdapter,
  deleteTweetlikeAdapter,
  updateTweetlikeAdapter,
  loadTweetlikeByPageAdapter,
} from "./tweetlikeAdapter";
import {
  toggleTweetlikePostSchema,
  loadTweetlikeGetSchema,
  deleteTweetlikeSchema,
  updateTweetlikeSchema,
  loadTweetlikeByPageGetSchema,
} from "./tweetlikeSchema";

async function tweetlike(fastify: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post(
    "/tweetlike/toggleLike",
    toggleTweetlikePostSchema,
    toggleTweetlikeAdapter()
  );
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
