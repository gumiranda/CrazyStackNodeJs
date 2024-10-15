import { LoadTweetRepository } from "@/slices/social-network/tweet/repositories";
import { TweetData } from "@/slices/social-network/tweet/entities";
import { Query } from "@/application/types";

export type LoadTweet = (query: Query) => Promise<TweetData | null>;
export type LoadTweetSignature = (loadTweet: LoadTweetRepository) => LoadTweet;
export const loadTweet: LoadTweetSignature =
  (loadTweetRepository: LoadTweetRepository) => async (query: Query) => {
    return loadTweetRepository.loadTweet(query);
  };
