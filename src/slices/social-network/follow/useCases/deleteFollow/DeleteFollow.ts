import { DeleteFollowRepository } from "@/slices/social-network/follow/repositories";
import { FollowData } from "@/slices/social-network/follow/entities";
import { Query } from "@/application/types";

export type DeleteFollow = (query: Query) => Promise<FollowData | null>;
export type DeleteFollowSignature = (deleteFollow: DeleteFollowRepository) => DeleteFollow;
export const deleteFollow: DeleteFollowSignature =
  (deleteFollowRepository: DeleteFollowRepository) => (query: Query) => {
    return deleteFollowRepository.deleteFollow(query);
  };
