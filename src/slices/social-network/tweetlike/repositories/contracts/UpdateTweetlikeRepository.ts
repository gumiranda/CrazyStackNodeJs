import { Query } from "@/application/types";
import { TweetlikeData } from "@/slices/social-network/tweetlike/entities";

export interface UpdateTweetlikeRepository {
  updateTweetlike(query: Query, data: TweetlikeData): Promise<TweetlikeData | null>;
}
