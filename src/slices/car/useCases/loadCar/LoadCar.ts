import { LoadCarRepository } from "@/slices/car/repositories";
import { CarData } from "@/slices/car/entities";
import { Query } from "@/application/types";

export type LoadCar = (query: Query) => Promise<CarData | null>;
export type LoadCarSignature = (loadCar: LoadCarRepository) => LoadCar;
export const loadCar: LoadCarSignature =
  (loadCarRepository: LoadCarRepository) => async (query: Query) => {
    return loadCarRepository.loadCar(query);
  };
