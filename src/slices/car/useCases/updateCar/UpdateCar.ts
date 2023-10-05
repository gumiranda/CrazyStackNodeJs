import { UpdateCarRepository } from "@/slices/car/repositories";
import { CarData } from "@/slices/car/entities";
import { Query } from "@/application/types";

export type UpdateCar = (query: Query, data: CarData) => Promise<CarData | null>;
export type UpdateCarSignature = (updateCar: UpdateCarRepository) => UpdateCar;
export const updateCar: UpdateCarSignature =
  (updateCarRepository: UpdateCarRepository) => async (query: Query, data: CarData) => {
    return updateCarRepository.updateCar(query, data);
  };
