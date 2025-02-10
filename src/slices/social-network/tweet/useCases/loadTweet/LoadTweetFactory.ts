import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/social-network/tweet/repositories";
import { loadTweet, LoadTweet } from "@/slices/social-network/tweet/useCases";

export const makeLoadTweetFactory = (): LoadTweet => {
  const repository = new TweetRepository(
    makeDatabaseInstance(whiteLabel.database, "tweet")
  );
  return loadTweet(repository);
};
