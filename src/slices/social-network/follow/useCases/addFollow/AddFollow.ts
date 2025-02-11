import { AddFollowRepository } from "@/slices/social-network/follow/repositories";
import { FollowEntity, FollowData } from "@/slices/social-network/follow/entities";

export type AddFollow = (data: FollowData) => Promise<FollowEntity | null>;
export type AddFollowSignature = (addFollow: AddFollowRepository) => AddFollow;
export const addFollow: AddFollowSignature =
  (addFollowRepository: AddFollowRepository) => (data: FollowData) => {
    return addFollowRepository.addFollow(new FollowEntity(data));
  };
