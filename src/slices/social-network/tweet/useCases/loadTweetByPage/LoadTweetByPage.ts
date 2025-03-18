import { LoadTweetByPageRepository } from "@/slices/social-network/tweet/repositories";
import { Query } from "@/application/types";
import type { LoadPhoto } from "@/slices/photo/useCases";
import type { LoadUser } from "@/slices/user/useCases";
import type { LoadTweetlikeByPage } from "@/slices/social-network/tweetlike/useCases";

export type LoadTweetByPage = (query: Query) => Promise<any | null>;
export type LoadTweetByPageSignature = (
  loadTweetByPage: LoadTweetByPageRepository,
  loadPhoto: LoadPhoto,
  loadUser: LoadUser,
  loadTweetlikeByPage: LoadTweetlikeByPage
) => LoadTweetByPage;

export const loadTweetByPage: LoadTweetByPageSignature =
  (loadTweetByPageRepository, loadPhoto, loadUser, loadTweetlikeByPage) =>
  async (query: Query) => {
    const tweetsPaginated = await loadTweetByPageRepository.loadTweetByPage(query);

    if (!tweetsPaginated?.tweets) {
      return tweetsPaginated;
    }

    const enrichedData = await Promise.all(
      tweetsPaginated.tweets.map(async (tweet) => {
        const sort = { createdAt: -1 };
        const options = { sort, page: 1 };
        const [photo, user, likes] = await Promise.all([
          tweet.image
            ? loadPhoto({ fields: { _id: tweet.image } })
            : Promise.resolve(null),
          tweet.createdById
            ? loadUser({
                fields: { _id: tweet.createdById },
                options: { projection: { password: 0 } },
              })
            : Promise.resolve(null),
          loadTweetlikeByPage({
            fields: {
              tweetId: tweet._id,
            },
            options,
          }),
        ]);
        const photoUser = (user as any)?.photo?.url ?? null;
        return {
          ...tweet,
          image: photo?.url ?? null,
          createdBy: { slug: user?.slug, photo: photoUser, name: user?.name },
          tweetlike: likes,
          retweets: 0,
        };
      })
    );

    return {
      ...tweetsPaginated,
      tweets: enrichedData,
    };
  };
