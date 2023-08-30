import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";

export interface LoadFidelityRepository {
  loadFidelity(query: Query): Promise<FidelityData | null>;
}
