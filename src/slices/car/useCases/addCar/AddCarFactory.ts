import { MongoRepository } from "@/application/infra";
import { CarRepository } from "@/slices/car/repositories";
import { addCar, AddCar } from "@/slices/car/useCases";

export const makeAddCarFactory = (): AddCar => {
  const repository = new CarRepository(new MongoRepository("car"));
  return addCar(repository);
};
