import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PlaceRepository } from "@/slices/place/repositories";
import { updatePlace, UpdatePlace } from "@/slices/place/useCases";

export const makeUpdatePlaceFactory = (): UpdatePlace => {
  const repository = new PlaceRepository(makeDatabaseInstance(whiteLabel.database,"place"));
  return updatePlace(repository);
};
