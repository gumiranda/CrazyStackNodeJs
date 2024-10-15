import { Query } from "@/application/types";
import { TweetData } from "@/slices/tweet/entities";

export interface DeleteTweetRepository {
    deleteTweet(query: Query): Promise<TweetData | null>;
}
