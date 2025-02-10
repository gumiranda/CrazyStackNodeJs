import { DeleteTweetRepository } from "@/slices/social-network/tweet/repositories";
import { TweetData } from "@/slices/social-network/tweet/entities";
import { Query } from "@/application/types";

export type DeleteTweet = (query: Query) => Promise<TweetData | null>;
export type DeleteTweetSignature = (deleteTweet: DeleteTweetRepository) => DeleteTweet;
export const deleteTweet: DeleteTweetSignature =
  (deleteTweetRepository: DeleteTweetRepository) => (query: Query) => {
    return deleteTweetRepository.deleteTweet(query);
  };
