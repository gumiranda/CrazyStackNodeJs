import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetlikeRepository } from "@/slices/tweetlike/repositories";
import { addTweetlike, AddTweetlike } from "@/slices/tweetlike/useCases";

export const makeAddTweetlikeFactory = (): AddTweetlike => {
  const repository = new TweetlikeRepository(makeDatabaseInstance(whiteLabel.database,"tweetlike"));
  return addTweetlike(repository);
};
