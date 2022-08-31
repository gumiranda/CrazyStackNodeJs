import { MongoRepository } from "@/application/infra";
import { RideRepository } from "@/slices/ride/repositories";
import { addRide, AddRide } from "@/slices/ride/useCases";

export const makeAddRideFactory = (): AddRide => {
  const repository = new RideRepository(new MongoRepository("ride"));
  return addRide(repository);
};
