import type { Query } from "@/application/types";

export interface GetCountTweetRepository {
  getCountTweet(query: Query): Promise<number | null>;
}
