import { Query } from "@/application/types";
import { FidelityPaginated } from "@/slices/fidelity/entities";

export interface LoadFidelityByPageRepository {
  loadFidelityByPage(query: Query): Promise<FidelityPaginated | null>;
}
