import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetlikeRepository } from "@/slices/tweetlike/repositories";
import { deleteTweetlike, DeleteTweetlike } from "@/slices/tweetlike/useCases";

export const makeDeleteTweetlikeFactory = (): DeleteTweetlike => {
  const repository = new TweetlikeRepository(makeDatabaseInstance(whiteLabel.database,"tweetlike"));
  return deleteTweetlike(repository);
};
