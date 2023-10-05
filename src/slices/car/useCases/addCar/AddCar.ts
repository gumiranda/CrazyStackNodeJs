import { AddCarRepository } from "@/slices/car/repositories";
import { CarEntity, CarData } from "@/slices/car/entities";

export type AddCar = (data: CarData) => Promise<CarEntity | null>;
export type AddCarSignature = (addCar: AddCarRepository) => AddCar;
export const addCar: AddCarSignature =
  (addCarRepository: AddCarRepository) => (data: CarData) => {
    return addCarRepository.addCar(new CarEntity(data));
  };
