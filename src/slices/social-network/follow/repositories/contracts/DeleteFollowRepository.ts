import { Query } from "@/application/types";
import { FollowData } from "@/slices/social-network/follow/entities";

export interface DeleteFollowRepository {
  deleteFollow(query: Query): Promise<FollowData | null>;
}
