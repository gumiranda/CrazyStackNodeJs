import { CarData } from "@/slices/car/entities";

export interface AddCarRepository {
  addCar(car: CarData): Promise<CarData | null>;
}
