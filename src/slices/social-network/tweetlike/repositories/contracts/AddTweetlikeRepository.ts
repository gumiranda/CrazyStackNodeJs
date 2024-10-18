import { TweetlikeData } from "@/slices/tweetlike/entities";

export interface AddTweetlikeRepository {
    addTweetlike(tweetlike: TweetlikeData): Promise<TweetlikeData | null>;
}
