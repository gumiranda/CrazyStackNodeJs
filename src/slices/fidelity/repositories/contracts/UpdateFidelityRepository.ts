import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";

export interface UpdateFidelityRepository {
  updateFidelity(query: Query, data: FidelityData): Promise<FidelityData | null>;
}
