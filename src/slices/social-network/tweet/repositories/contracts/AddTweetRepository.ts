import { TweetData } from "@/slices/social-network/tweet/entities";

export interface AddTweetRepository {
  addTweet(tweet: TweetData): Promise<TweetData | null>;
}
