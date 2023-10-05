import { Query } from "@/application/types";
import { CarData } from "@/slices/car/entities";

export interface DeleteCarRepository {
  deleteCar(query: Query): Promise<CarData | null>;
}
