import { LoadAccountByPageRepository } from "@/slices/account/repositories";
import { AccountPaginated } from "@/slices/account/entities";
import { Query } from "@/application/types";

export type LoadAccountByPage = (query: Query) => Promise<AccountPaginated | null>;
export type LoadAccountByPageSignature = (
    loadAccountByPage: LoadAccountByPageRepository
) => LoadAccountByPage;
export const loadAccountByPage: LoadAccountByPageSignature =
    (loadAccountByPageRepository: LoadAccountByPageRepository) =>
    async (query: Query) => {
        return loadAccountByPageRepository.loadAccountByPage(query);
    };
