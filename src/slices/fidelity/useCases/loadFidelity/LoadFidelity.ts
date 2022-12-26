import { LoadFidelityRepository } from "@/slices/fidelity/repositories";
import { FidelityData } from "@/slices/fidelity/entities";
import { Query } from "@/application/types";

export type LoadFidelity = (query: Query) => Promise<FidelityData | null>;
export type LoadFidelitySignature = (loadFidelity: LoadFidelityRepository) => LoadFidelity;
export const loadFidelity: LoadFidelitySignature =
    (loadFidelityRepository: LoadFidelityRepository) => async (query: Query) => {
        return loadFidelityRepository.loadFidelity(query);
    };
