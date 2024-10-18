import { UpdateFollowRepository } from "@/slices/follow/repositories";
import { FollowData } from "@/slices/follow/entities";
import { Query } from "@/application/types";

export type UpdateFollow = (
    query: Query,
    data: FollowData
) => Promise<FollowData | null>;
export type UpdateFollowSignature = (
    updateFollow: UpdateFollowRepository
) => UpdateFollow;
export const updateFollow: UpdateFollowSignature =
    (updateFollowRepository: UpdateFollowRepository) =>
    async (query: Query, data: FollowData) => {
        return updateFollowRepository.updateFollow(query, data);
    };
