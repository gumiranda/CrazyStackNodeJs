import { makeDatabaseInstance } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { deleteRide, DeleteRide } from "@/slices/ride/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteRideFactory = (): DeleteRide => {
  const repository = new RideRepository(makeDatabaseInstance(whiteLabel.database, "ride"));
  return deleteRide(repository);
};
