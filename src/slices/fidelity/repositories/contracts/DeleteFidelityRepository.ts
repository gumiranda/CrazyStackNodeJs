import { Query } from "@/application/types";
import { FidelityData } from "@/slices/fidelity/entities";

export interface DeleteFidelityRepository {
  deleteFidelity(query: Query): Promise<FidelityData | null>;
}
