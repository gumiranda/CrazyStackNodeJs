import { Query } from "@/application/types";
import { FollowData } from "@/slices/follow/entities";

export interface LoadFollowRepository {
    loadFollow(query: Query): Promise<FollowData | null>;
}
