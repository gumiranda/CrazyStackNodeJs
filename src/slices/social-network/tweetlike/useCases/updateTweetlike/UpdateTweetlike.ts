import { UpdateTweetlikeRepository } from "@/slices/social-network/tweetlike/repositories";
import { TweetlikeData } from "@/slices/social-network/tweetlike/entities";
import { Query } from "@/application/types";

export type UpdateTweetlike = (
  query: Query,
  data: TweetlikeData
) => Promise<TweetlikeData | null>;
export type UpdateTweetlikeSignature = (
  updateTweetlike: UpdateTweetlikeRepository
) => UpdateTweetlike;
export const updateTweetlike: UpdateTweetlikeSignature =
  (updateTweetlikeRepository: UpdateTweetlikeRepository) =>
  async (query: Query, data: TweetlikeData) => {
    return updateTweetlikeRepository.updateTweetlike(query, data);
  };
