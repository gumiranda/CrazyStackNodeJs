import { Query } from "@/application/types";
import { TweetlikeData } from "@/slices/social-network/tweetlike/entities";

export interface DeleteTweetlikeRepository {
  deleteTweetlike(query: Query): Promise<TweetlikeData | null>;
}
