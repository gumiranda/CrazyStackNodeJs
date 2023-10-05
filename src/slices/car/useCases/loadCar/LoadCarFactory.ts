import { MongoRepository } from "@/application/infra";
import { CarRepository } from "@/slices/car/repositories";
import { loadCar, LoadCar } from "@/slices/car/useCases";

export const makeLoadCarFactory = (): LoadCar => {
  const repository = new CarRepository(new MongoRepository("car"));
  return loadCar(repository);
};
