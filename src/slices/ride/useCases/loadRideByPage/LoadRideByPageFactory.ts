import { MongoRepository } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { loadRideByPage, LoadRideByPage } from "@/slices/ride/useCases";

export const makeLoadRideByPageFactory = (): LoadRideByPage => {
  const repository = new RideRepository(new MongoRepository("ride"));
  return loadRideByPage(repository);
};
