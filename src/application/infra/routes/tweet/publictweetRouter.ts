import { loadTweetByPageAdapter } from "./tweetAdapter";
import { loadTweetByPageGetSchema } from "./tweetSchema";

async function publictweet(fastify: any) {
  fastify.get(
    "/publictweet/loadByPage",
    loadTweetByPageGetSchema,
    loadTweetByPageAdapter()
  );
}
export { publictweet };
