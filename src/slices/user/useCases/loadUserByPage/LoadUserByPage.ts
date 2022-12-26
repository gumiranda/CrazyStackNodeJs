import { LoadUserByPageRepository } from "@/slices/user/repositories";
import { UserPaginated } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type LoadUserByPage = (query: Query) => Promise<UserPaginated | null>;
export type LoadUserByPageSignature = (
    loadUserByPage: LoadUserByPageRepository
) => LoadUserByPage;
export const loadUserByPage: LoadUserByPageSignature =
    (loadUserByPageRepository: LoadUserByPageRepository) =>
    async (query: Query) => {
        return loadUserByPageRepository.loadUserByPage(query);
    };
