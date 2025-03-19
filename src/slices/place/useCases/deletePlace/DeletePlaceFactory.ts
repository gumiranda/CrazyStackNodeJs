import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PlaceRepository } from "@/slices/place/repositories";
import { deletePlace, DeletePlace } from "@/slices/place/useCases";

export const makeDeletePlaceFactory = (): DeletePlace => {
  const repository = new PlaceRepository(makeDatabaseInstance(whiteLabel.database,"place"));
  return deletePlace(repository);
};
