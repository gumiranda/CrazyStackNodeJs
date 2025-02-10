import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetlikeRepository } from "@/slices/social-network/tweetlike/repositories";
import { addTweetlike, AddTweetlike } from "@/slices/social-network/tweetlike/useCases";

export const makeAddTweetlikeFactory = (): AddTweetlike => {
  const repository = new TweetlikeRepository(
    makeDatabaseInstance(whiteLabel.database, "tweetlike"),
    makeDatabaseInstance(whiteLabel.database, "tweettweetlike")
  );
  return addTweetlike(repository);
};
