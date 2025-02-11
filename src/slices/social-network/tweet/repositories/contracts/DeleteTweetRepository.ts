import { Query } from "@/application/types";
import { TweetData } from "@/slices/social-network/tweet/entities";

export interface DeleteTweetRepository {
  deleteTweet(query: Query): Promise<TweetData | null>;
}
