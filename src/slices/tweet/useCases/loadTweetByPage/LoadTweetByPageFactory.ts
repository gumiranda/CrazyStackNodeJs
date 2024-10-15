import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/tweet/repositories";
import { loadTweetByPage, LoadTweetByPage } from "@/slices/tweet/useCases";

export const makeLoadTweetByPageFactory = (): LoadTweetByPage => {
  const repository = new TweetRepository(makeDatabaseInstance(whiteLabel.database,"tweet"));
  return loadTweetByPage(repository);
};
