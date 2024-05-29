import { makeDatabaseInstance } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { loadRideByPage, LoadRideByPage } from "@/slices/ride/useCases";

export const makeLoadRideByPageFactory = (): LoadRideByPage => {
  const repository = new RideRepository(makeDatabaseInstance("mongodb", "ride"));
  return loadRideByPage(repository);
};
