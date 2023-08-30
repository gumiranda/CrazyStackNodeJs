import { LoadClientByPageRepository } from "@/slices/client/repositories";
import { ClientPaginated } from "@/slices/client/entities";
import { Query } from "@/application/types";

export type LoadClientByPage = (query: Query) => Promise<ClientPaginated | null>;
export type LoadClientByPageSignature = (
  loadClientByPage: LoadClientByPageRepository
) => LoadClientByPage;
export const loadClientByPage: LoadClientByPageSignature =
  (loadClientByPageRepository: LoadClientByPageRepository) => async (query: Query) => {
    return loadClientByPageRepository.loadClientByPage(query);
  };
