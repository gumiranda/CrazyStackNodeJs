import { AddFidelityRepository } from "@/slices/fidelity/repositories";
import { FidelityEntity, FidelityData } from "@/slices/fidelity/entities";

export type AddFidelity = (data: FidelityData) => Promise<FidelityEntity | null>;
export type AddFidelitySignature = (addFidelity: AddFidelityRepository) => AddFidelity;
export const addFidelity: AddFidelitySignature =
    (addFidelityRepository: AddFidelityRepository) => (data: FidelityData) => {
        return addFidelityRepository.addFidelity(new FidelityEntity(data));
    };
