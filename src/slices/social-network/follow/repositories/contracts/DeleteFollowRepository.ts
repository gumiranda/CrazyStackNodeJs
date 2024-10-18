import { Query } from "@/application/types";
import { FollowData } from "@/slices/follow/entities";

export interface DeleteFollowRepository {
    deleteFollow(query: Query): Promise<FollowData | null>;
}
