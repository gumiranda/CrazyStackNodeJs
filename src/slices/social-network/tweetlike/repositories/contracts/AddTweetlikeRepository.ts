import { TweetlikeData } from "@/slices/social-network/tweetlike/entities";

export interface AddTweetlikeRepository {
  addTweetlike(tweetlike: TweetlikeData): Promise<TweetlikeData | null>;
}
