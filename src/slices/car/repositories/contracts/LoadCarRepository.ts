import { Query } from "@/application/types";
import { CarData } from "@/slices/car/entities";

export interface LoadCarRepository {
  loadCar(query: Query): Promise<CarData | null>;
}
