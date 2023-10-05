import { Query } from "@/application/types";
import { CarData } from "@/slices/car/entities";

export interface UpdateCarRepository {
  updateCar(query: Query, data: CarData): Promise<CarData | null>;
}
