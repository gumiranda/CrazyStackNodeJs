import { authLogged } from "@/application/infra/middlewares";
import {
  addTweetAdapter,
  loadTweetAdapter,
  deleteTweetAdapter,
  updateTweetAdapter,
  loadTweetByPageAdapter,
} from "./tweetAdapter";
import {
  addTweetPostSchema,
  loadTweetGetSchema,
  deleteTweetSchema,
  updateTweetSchema,
  loadTweetByPageGetSchema,
} from "./tweetSchema";

async function tweet(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/tweet/add", addTweetPostSchema, addTweetAdapter());
  fastify.get("/tweet/load", loadTweetGetSchema, loadTweetAdapter());
  fastify.get(
    "/tweet/loadByPage",
    loadTweetByPageGetSchema,
    loadTweetByPageAdapter()
  );
  fastify.delete("/tweet/delete", deleteTweetSchema, deleteTweetAdapter());
  fastify.patch("/tweet/update", updateTweetSchema, updateTweetAdapter());
}
export { tweet };
