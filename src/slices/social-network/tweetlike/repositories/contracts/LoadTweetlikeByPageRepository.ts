import { Query } from "@/application/types";
import { TweetlikePaginated } from "@/slices/tweetlike/entities";

export interface LoadTweetlikeByPageRepository {
    loadTweetlikeByPage(query: Query): Promise<TweetlikePaginated | null>;
}
