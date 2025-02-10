import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/social-network/tweet/repositories";
import { updateTweet, UpdateTweet } from "@/slices/social-network/tweet/useCases";

export const makeUpdateTweetFactory = (): UpdateTweet => {
  const repository = new TweetRepository(
    makeDatabaseInstance(whiteLabel.database, "tweet")
  );
  return updateTweet(repository);
};
