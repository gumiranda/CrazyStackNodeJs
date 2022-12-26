import { LoadFidelityByPageRepository } from "@/slices/fidelity/repositories";
import { FidelityPaginated } from "@/slices/fidelity/entities";
import { Query } from "@/application/types";

export type LoadFidelityByPage = (query: Query) => Promise<FidelityPaginated | null>;
export type LoadFidelityByPageSignature = (
    loadFidelityByPage: LoadFidelityByPageRepository
) => LoadFidelityByPage;
export const loadFidelityByPage: LoadFidelityByPageSignature =
    (loadFidelityByPageRepository: LoadFidelityByPageRepository) =>
    async (query: Query) => {
        return loadFidelityByPageRepository.loadFidelityByPage(query);
    };
