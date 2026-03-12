import { Query } from "@/application/types";
import type { LoadOwnerByPageRepository } from "../../repositories";

export type LoadOwnerByPage = (query: Query) => Promise<any | null>;
export type LoadOwnerByPageSignature = (
  loadOwnerByPage: LoadOwnerByPageRepository
) => LoadOwnerByPage;

export const loadOwnerByPage: LoadOwnerByPageSignature =
  (loadOwnerByPageRepository) => async (query: Query) => {
    return loadOwnerByPageRepository.loadOwnerByPage(query);
  };
