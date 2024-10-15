import { Query } from "@/application/types";
import { TweetData } from "@/slices/tweet/entities";

export interface LoadTweetRepository {
    loadTweet(query: Query): Promise<TweetData | null>;
}
