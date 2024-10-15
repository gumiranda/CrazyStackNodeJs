import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/social-network/tweet/repositories";
import { loadTweetByPage, LoadTweetByPage } from "@/slices/social-network/tweet/useCases";

export const makeLoadTweetByPageFactory = (): LoadTweetByPage => {
  const repository = new TweetRepository(
    makeDatabaseInstance(whiteLabel.database, "tweet")
  );
  return loadTweetByPage(repository);
};
