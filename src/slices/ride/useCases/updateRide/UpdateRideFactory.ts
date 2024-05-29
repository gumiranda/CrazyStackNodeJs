import { makeDatabaseInstance } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { updateRide, UpdateRide } from "@/slices/ride/useCases";

export const makeUpdateRideFactory = (): UpdateRide => {
  const repository = new RideRepository(makeDatabaseInstance("mongodb", "ride"));
  return updateRide(repository);
};
