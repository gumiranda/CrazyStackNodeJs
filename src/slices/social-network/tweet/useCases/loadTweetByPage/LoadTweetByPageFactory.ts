import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeLoadPhotoFactory } from "@/slices/photo/useCases";
import { TweetRepository } from "@/slices/social-network/tweet/repositories";
import { loadTweetByPage, LoadTweetByPage } from "@/slices/social-network/tweet/useCases";
import { makeLoadTweetlikeByPageFactory } from "@/slices/social-network/tweetlike/useCases";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeLoadTweetByPageFactory = (): LoadTweetByPage => {
  const repository = new TweetRepository(
    makeDatabaseInstance(whiteLabel.database, "tweet")
  );
  return loadTweetByPage(
    repository,
    makeLoadPhotoFactory(),
    makeLoadUserFactory(),
    makeLoadTweetlikeByPageFactory()
  );
};
