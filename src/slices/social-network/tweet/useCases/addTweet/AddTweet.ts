import { AddTweetRepository } from "@/slices/tweet/repositories";
import { TweetEntity, TweetData } from "@/slices/tweet/entities";

export type AddTweet = (data: TweetData) => Promise<TweetEntity | null>;
export type AddTweetSignature = (addTweet: AddTweetRepository) => AddTweet;
export const addTweet: AddTweetSignature =
    (addTweetRepository: AddTweetRepository) => (data: TweetData) => {
        return addTweetRepository.addTweet(new TweetEntity(data));
    };
