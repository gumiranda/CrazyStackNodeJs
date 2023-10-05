import { MongoRepository } from "@/application/infra";
import { CarRepository } from "@/slices/car/repositories";
import { deleteCar, DeleteCar } from "@/slices/car/useCases";

export const makeDeleteCarFactory = (): DeleteCar => {
  const repository = new CarRepository(new MongoRepository("car"));
  return deleteCar(repository);
};
