import { LoadFollowByPageRepository } from "@/slices/social-network/follow/repositories";
import { FollowPaginated } from "@/slices/social-network/follow/entities";
import { Query } from "@/application/types";

export type LoadFollowByPage = (query: Query) => Promise<FollowPaginated | null>;
export type LoadFollowByPageSignature = (
  loadFollowByPage: LoadFollowByPageRepository
) => LoadFollowByPage;
export const loadFollowByPage: LoadFollowByPageSignature =
  (loadFollowByPageRepository: LoadFollowByPageRepository) => async (query: Query) => {
    return loadFollowByPageRepository.loadFollowByPage(query);
  };
