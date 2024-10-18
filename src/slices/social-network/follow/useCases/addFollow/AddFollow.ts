import { AddFollowRepository } from "@/slices/follow/repositories";
import { FollowEntity, FollowData } from "@/slices/follow/entities";

export type AddFollow = (data: FollowData) => Promise<FollowEntity | null>;
export type AddFollowSignature = (addFollow: AddFollowRepository) => AddFollow;
export const addFollow: AddFollowSignature =
    (addFollowRepository: AddFollowRepository) => (data: FollowData) => {
        return addFollowRepository.addFollow(new FollowEntity(data));
    };
