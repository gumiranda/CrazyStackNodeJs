import { UpdateTweetRepository } from "@/slices/tweet/repositories";
import { TweetData } from "@/slices/tweet/entities";
import { Query } from "@/application/types";

export type UpdateTweet = (
    query: Query,
    data: TweetData
) => Promise<TweetData | null>;
export type UpdateTweetSignature = (
    updateTweet: UpdateTweetRepository
) => UpdateTweet;
export const updateTweet: UpdateTweetSignature =
    (updateTweetRepository: UpdateTweetRepository) =>
    async (query: Query, data: TweetData) => {
        return updateTweetRepository.updateTweet(query, data);
    };
