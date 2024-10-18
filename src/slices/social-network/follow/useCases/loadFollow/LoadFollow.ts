import { LoadFollowRepository } from "@/slices/follow/repositories";
import { FollowData } from "@/slices/follow/entities";
import { Query } from "@/application/types";

export type LoadFollow = (query: Query) => Promise<FollowData | null>;
export type LoadFollowSignature = (loadFollow: LoadFollowRepository) => LoadFollow;
export const loadFollow: LoadFollowSignature =
    (loadFollowRepository: LoadFollowRepository) => async (query: Query) => {
        return loadFollowRepository.loadFollow(query);
    };
