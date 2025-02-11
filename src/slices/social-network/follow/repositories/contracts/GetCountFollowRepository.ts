import type { Query } from "@/application/types";

export interface GetCountFollowRepository {
  getCountFollow(query: Query): Promise<number | null>;
}
