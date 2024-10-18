import { LoadTweetlikeRepository } from "@/slices/tweetlike/repositories";
import { TweetlikeData } from "@/slices/tweetlike/entities";
import { Query } from "@/application/types";

export type LoadTweetlike = (query: Query) => Promise<TweetlikeData | null>;
export type LoadTweetlikeSignature = (loadTweetlike: LoadTweetlikeRepository) => LoadTweetlike;
export const loadTweetlike: LoadTweetlikeSignature =
    (loadTweetlikeRepository: LoadTweetlikeRepository) => async (query: Query) => {
        return loadTweetlikeRepository.loadTweetlike(query);
    };
