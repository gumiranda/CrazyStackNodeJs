import { TweetData } from "@/slices/tweet/entities";

export interface AddTweetRepository {
    addTweet(tweet: TweetData): Promise<TweetData | null>;
}
