import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { RideRepository } from "@/slices/ride/repositories";
import { addRide, AddRide } from "@/slices/ride/useCases";

export const makeAddRideFactory = (): AddRide => {
  const repository = new RideRepository(makeDatabaseInstance(whiteLabel.database, "ride"));
  return addRide(repository);
};
