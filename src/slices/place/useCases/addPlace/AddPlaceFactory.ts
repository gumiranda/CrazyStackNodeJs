import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PlaceRepository } from "@/slices/place/repositories";
import { addPlace, AddPlace } from "@/slices/place/useCases";

export const makeAddPlaceFactory = (): AddPlace => {
  const repository = new PlaceRepository(makeDatabaseInstance(whiteLabel.database,"place"));
  return addPlace(repository);
};
