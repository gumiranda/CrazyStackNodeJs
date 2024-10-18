import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetlikeRepository } from "@/slices/tweetlike/repositories";
import { loadTweetlikeByPage, LoadTweetlikeByPage } from "@/slices/tweetlike/useCases";

export const makeLoadTweetlikeByPageFactory = (): LoadTweetlikeByPage => {
  const repository = new TweetlikeRepository(makeDatabaseInstance(whiteLabel.database,"tweetlike"));
  return loadTweetlikeByPage(repository);
};
