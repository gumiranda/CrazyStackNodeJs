import { FollowData } from "@/slices/follow/entities";

export interface AddFollowRepository {
    addFollow(follow: FollowData): Promise<FollowData | null>;
}
