import { MongoRepository } from "@/application/infra";
import { CarRepository } from "@/slices/car/repositories";
import { loadCarByPage, LoadCarByPage } from "@/slices/car/useCases";

export const makeLoadCarByPageFactory = (): LoadCarByPage => {
  const repository = new CarRepository(new MongoRepository("car"));
  return loadCarByPage(repository);
};
