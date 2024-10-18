import { Query } from "@/application/types";
import { FollowPaginated } from "@/slices/follow/entities";

export interface LoadFollowByPageRepository {
    loadFollowByPage(query: Query): Promise<FollowPaginated | null>;
}
