import { makeDatabaseInstance } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { deleteRide, DeleteRide } from "@/slices/ride/useCases";

export const makeDeleteRideFactory = (): DeleteRide => {
  const repository = new RideRepository(makeDatabaseInstance("mongodb", "ride"));
  return deleteRide(repository);
};
