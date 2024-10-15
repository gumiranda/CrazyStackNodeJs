import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TweetRepository } from "@/slices/tweet/repositories";
import { deleteTweet, DeleteTweet } from "@/slices/tweet/useCases";

export const makeDeleteTweetFactory = (): DeleteTweet => {
  const repository = new TweetRepository(makeDatabaseInstance(whiteLabel.database,"tweet"));
  return deleteTweet(repository);
};
