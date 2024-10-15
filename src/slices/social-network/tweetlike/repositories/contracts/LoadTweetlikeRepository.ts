import { Query } from "@/application/types";
import { TweetlikeData } from "@/slices/social-network/tweetlike/entities";

export interface LoadTweetlikeRepository {
  loadTweetlike(query: Query): Promise<TweetlikeData | null>;
}
