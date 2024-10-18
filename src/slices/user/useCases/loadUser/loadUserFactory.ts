import { makeDatabaseInstance } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { loadUser } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeLoadPhotoFactory } from "@/slices/photo/useCases";
import { FollowRepository } from "@/slices/social-network/follow/repositories";
import { TweetRepository } from "@/slices/social-network/tweet/repositories";

export const makeLoadUserFactory = () => {
  const repository = new UserRepository(
    makeDatabaseInstance(whiteLabel.database, "users")
  );
  const repositoryFollow = new FollowRepository(
    makeDatabaseInstance(whiteLabel.database, "follow")
  );
  const repositoryTweet = new TweetRepository(
    makeDatabaseInstance(whiteLabel.database, "tweet")
  );
  return loadUser(repository, makeLoadPhotoFactory(), repositoryFollow, repositoryTweet);
};
