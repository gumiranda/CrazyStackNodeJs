import { DeleteTweetRepository } from "@/slices/tweet/repositories";
import { TweetData } from "@/slices/tweet/entities";
import { Query } from "@/application/types";

export type DeleteTweet = (query: Query) => Promise<TweetData | null>;
export type DeleteTweetSignature = (
    deleteTweet: DeleteTweetRepository
) => DeleteTweet;
export const deleteTweet: DeleteTweetSignature =
    (deleteTweetRepository: DeleteTweetRepository) => (query: Query) => {
        return deleteTweetRepository.deleteTweet(query);
    };
