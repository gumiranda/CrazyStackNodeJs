import { makeDatabaseInstance } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { updateRide, UpdateRide } from "@/slices/ride/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateRideFactory = (): UpdateRide => {
  const repository = new RideRepository(makeDatabaseInstance(whiteLabel.database, "ride"));
  return updateRide(repository);
};
