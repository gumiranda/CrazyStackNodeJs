import { FollowData } from "@/slices/social-network/follow/entities";

export interface AddFollowRepository {
  addFollow(follow: FollowData): Promise<FollowData | null>;
}
