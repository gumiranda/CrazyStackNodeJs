import { Query } from "@/application/types";
import { RidePaginated } from "@/slices/ride/entities";

export interface LoadRideByPageRepository {
  loadRideByPage(query: Query): Promise<RidePaginated | null>;
}
