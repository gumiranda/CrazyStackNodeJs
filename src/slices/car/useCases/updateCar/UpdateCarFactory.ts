import { MongoRepository } from "@/application/infra";
import { CarRepository } from "@/slices/car/repositories";
import { updateCar, UpdateCar } from "@/slices/car/useCases";

export const makeUpdateCarFactory = (): UpdateCar => {
  const repository = new CarRepository(new MongoRepository("car"));
  return updateCar(repository);
};
