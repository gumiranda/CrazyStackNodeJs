import { DeleteCarRepository } from "@/slices/car/repositories";
import { CarData } from "@/slices/car/entities";
import { Query } from "@/application/types";

export type DeleteCar = (query: Query) => Promise<CarData | null>;
export type DeleteCarSignature = (deleteCar: DeleteCarRepository) => DeleteCar;
export const deleteCar: DeleteCarSignature =
  (deleteCarRepository: DeleteCarRepository) => (query: Query) => {
    return deleteCarRepository.deleteCar(query);
  };
