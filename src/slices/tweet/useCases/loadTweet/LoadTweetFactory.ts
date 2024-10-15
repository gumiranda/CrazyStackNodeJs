import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/tweet/repositories";
import { loadTweet, LoadTweet } from "@/slices/tweet/useCases";

export const makeLoadTweetFactory = (): LoadTweet => {
  const repository = new TweetRepository(makeDatabaseInstance(whiteLabel.database,"tweet"));
  return loadTweet(repository);
};
