import { Query } from "@/application/types";
import { FollowData } from "@/slices/follow/entities";

export interface UpdateFollowRepository {
    updateFollow(query: Query, data: FollowData): Promise<FollowData | null>;
}
