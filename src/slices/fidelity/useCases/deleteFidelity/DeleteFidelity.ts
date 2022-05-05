import { DeleteFidelityRepository } from "@/slices/fidelity/repositories";
import { FidelityData } from "@/slices/fidelity/entities";
import { Query } from "@/application/types";

export type DeleteFidelity = (query: Query) => Promise<FidelityData | null>;
export type DeleteFidelitySignature = (
    deleteFidelity: DeleteFidelityRepository
) => DeleteFidelity;
export const deleteFidelity: DeleteFidelitySignature =
    (deleteFidelityRepository: DeleteFidelityRepository) => (query: Query) => {
        return deleteFidelityRepository.deleteFidelity(query);
    };
