import { DeleteTweetlikeRepository } from "@/slices/social-network/tweetlike/repositories";
import { TweetlikeData } from "@/slices/social-network/tweetlike/entities";
import { Query } from "@/application/types";

export type DeleteTweetlike = (query: Query) => Promise<TweetlikeData | null>;
export type DeleteTweetlikeSignature = (
  deleteTweetlike: DeleteTweetlikeRepository
) => DeleteTweetlike;
export const deleteTweetlike: DeleteTweetlikeSignature =
  (deleteTweetlikeRepository: DeleteTweetlikeRepository) => (query: Query) => {
    return deleteTweetlikeRepository.deleteTweetlike(query);
  };
