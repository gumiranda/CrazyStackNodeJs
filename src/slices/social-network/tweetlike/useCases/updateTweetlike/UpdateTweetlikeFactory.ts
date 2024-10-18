import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetlikeRepository } from "@/slices/tweetlike/repositories";
import { updateTweetlike, UpdateTweetlike } from "@/slices/tweetlike/useCases";

export const makeUpdateTweetlikeFactory = (): UpdateTweetlike => {
  const repository = new TweetlikeRepository(makeDatabaseInstance(whiteLabel.database,"tweetlike"));
  return updateTweetlike(repository);
};
