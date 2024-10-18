import { DeleteFollowRepository } from "@/slices/follow/repositories";
import { FollowData } from "@/slices/follow/entities";
import { Query } from "@/application/types";

export type DeleteFollow = (query: Query) => Promise<FollowData | null>;
export type DeleteFollowSignature = (
    deleteFollow: DeleteFollowRepository
) => DeleteFollow;
export const deleteFollow: DeleteFollowSignature =
    (deleteFollowRepository: DeleteFollowRepository) => (query: Query) => {
        return deleteFollowRepository.deleteFollow(query);
    };
