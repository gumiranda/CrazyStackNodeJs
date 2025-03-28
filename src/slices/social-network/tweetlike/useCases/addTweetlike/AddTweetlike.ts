import { AddTweetlikeRepository } from "@/slices/social-network/tweetlike/repositories";
import {
  TweetlikeEntity,
  TweetlikeData,
} from "@/slices/social-network/tweetlike/entities";

export type AddTweetlike = (data: TweetlikeData) => Promise<TweetlikeEntity | null>;
export type AddTweetlikeSignature = (addTweetlike: AddTweetlikeRepository) => AddTweetlike;
export const addTweetlike: AddTweetlikeSignature =
  (addTweetlikeRepository: AddTweetlikeRepository) => (data: TweetlikeData) => {
    return addTweetlikeRepository.addTweetlike(new TweetlikeEntity(data));
  };
