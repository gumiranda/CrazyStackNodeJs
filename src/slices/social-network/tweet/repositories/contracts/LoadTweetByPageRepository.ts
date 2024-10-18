import { Query } from "@/application/types";
import { TweetPaginated } from "@/slices/tweet/entities";

export interface LoadTweetByPageRepository {
    loadTweetByPage(query: Query): Promise<TweetPaginated | null>;
}
