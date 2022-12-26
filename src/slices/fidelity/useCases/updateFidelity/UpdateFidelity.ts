import { UpdateFidelityRepository } from "@/slices/fidelity/repositories";
import { FidelityData } from "@/slices/fidelity/entities";
import { Query } from "@/application/types";

export type UpdateFidelity = (
    query: Query,
    data: FidelityData
) => Promise<FidelityData | null>;
export type UpdateFidelitySignature = (
    updateFidelity: UpdateFidelityRepository
) => UpdateFidelity;
export const updateFidelity: UpdateFidelitySignature =
    (updateFidelityRepository: UpdateFidelityRepository) =>
    async (query: Query, data: FidelityData) => {
        return updateFidelityRepository.updateFidelity(query, data);
    };
