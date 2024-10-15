import { Query } from "@/application/types";
import { FollowPaginated } from "@/slices/social-network/follow/entities";

export interface LoadFollowByPageRepository {
  loadFollowByPage(query: Query): Promise<FollowPaginated | null>;
}
