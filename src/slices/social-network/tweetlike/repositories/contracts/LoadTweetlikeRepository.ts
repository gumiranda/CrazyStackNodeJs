import { Query } from "@/application/types";
import { TweetlikeData } from "@/slices/tweetlike/entities";

export interface LoadTweetlikeRepository {
    loadTweetlike(query: Query): Promise<TweetlikeData | null>;
}
