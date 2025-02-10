import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/social-network/tweet/repositories";
import { addTweet, AddTweet } from "@/slices/social-network/tweet/useCases";

export const makeAddTweetFactory = (): AddTweet => {
  const repository = new TweetRepository(
    makeDatabaseInstance(whiteLabel.database, "tweet")
  );
  return addTweet(repository);
};
