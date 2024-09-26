import { makeDatabaseInstance } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { loadRide, LoadRide } from "@/slices/ride/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRideFactory = (): LoadRide => {
  const repository = new RideRepository(makeDatabaseInstance(whiteLabel.database, "ride"));
  return loadRide(repository);
};
