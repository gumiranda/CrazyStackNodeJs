import { Query } from "@/application/types";
import { TweetData } from "@/slices/social-network/tweet/entities";

export interface UpdateTweetRepository {
  updateTweet(query: Query, data: TweetData): Promise<TweetData | null>;
}
