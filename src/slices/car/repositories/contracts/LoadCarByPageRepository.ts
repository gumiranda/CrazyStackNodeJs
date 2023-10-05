import { Query } from "@/application/types";
import { CarPaginated } from "@/slices/car/entities";

export interface LoadCarByPageRepository {
  loadCarByPage(query: Query): Promise<CarPaginated | null>;
}
