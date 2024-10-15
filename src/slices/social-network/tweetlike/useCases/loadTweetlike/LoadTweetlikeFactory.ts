import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetlikeRepository } from "@/slices/social-network/tweetlike/repositories";
import { loadTweetlike, LoadTweetlike } from "@/slices/social-network/tweetlike/useCases";

export const makeLoadTweetlikeFactory = (): LoadTweetlike => {
  const repository = new TweetlikeRepository(
    makeDatabaseInstance(whiteLabel.database, "tweetlike")
  );
  return loadTweetlike(repository);
};
