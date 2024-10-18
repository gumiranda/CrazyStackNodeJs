import { LoadUserRepository } from "@/slices/user/repositories";
import { Query } from "@/application/types";
import { LoadPhoto } from "@/slices/photo/useCases";
import type { GetCountFollowRepository } from "@/slices/social-network/follow/repositories";
import type { GetCountTweetRepository } from "@/slices/social-network/tweet/repositories";

export const loadUser: any =
  (
    loadUserRepository: LoadUserRepository,
    loadPhoto: LoadPhoto,
    followRepository: GetCountFollowRepository,
    tweetRepository: GetCountTweetRepository
  ) =>
  async (query: Query) => {
    const [user, followingsResult, followersResult, tweetsResult] = await Promise.all([
      loadUserRepository.loadUser(query),
      followRepository.getCountFollow({ fields: { createdById: query?.fields?._id } }),
      followRepository.getCountFollow({ fields: { userId: query?.fields?._id } }),
      tweetRepository.getCountTweet({ fields: { createdById: query?.fields?._id } }),
    ]);

    const followings = followingsResult ?? 0;
    const followers = followersResult ?? 0;
    const tweets = tweetsResult ?? 0;
    if (user?.photoId) {
      const photo: any = await loadPhoto({ fields: { _id: user.photoId } });
      return { ...user, photo, followings, followers, tweets };
    }
    return { ...user, followings, followers, tweets };
  };
