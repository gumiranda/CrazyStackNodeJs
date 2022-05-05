import { FidelityData } from "@/slices/fidelity/entities";

export interface AddFidelityRepository {
    addFidelity(fidelity: FidelityData): Promise<FidelityData | null>;
}
