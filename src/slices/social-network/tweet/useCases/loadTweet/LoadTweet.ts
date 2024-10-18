import { LoadTweetRepository } from "@/slices/tweet/repositories";
import { TweetData } from "@/slices/tweet/entities";
import { Query } from "@/application/types";

export type LoadTweet = (query: Query) => Promise<TweetData | null>;
export type LoadTweetSignature = (loadTweet: LoadTweetRepository) => LoadTweet;
export const loadTweet: LoadTweetSignature =
    (loadTweetRepository: LoadTweetRepository) => async (query: Query) => {
        return loadTweetRepository.loadTweet(query);
    };
