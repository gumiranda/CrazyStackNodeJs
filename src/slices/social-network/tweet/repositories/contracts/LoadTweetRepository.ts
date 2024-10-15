import { Query } from "@/application/types";
import { TweetData } from "@/slices/social-network/tweet/entities";

export interface LoadTweetRepository {
  loadTweet(query: Query): Promise<TweetData | null>;
}
