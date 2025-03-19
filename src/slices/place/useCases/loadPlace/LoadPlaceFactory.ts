import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PlaceRepository } from "@/slices/place/repositories";
import { loadPlace, LoadPlace } from "@/slices/place/useCases";

export const makeLoadPlaceFactory = (): LoadPlace => {
  const repository = new PlaceRepository(makeDatabaseInstance(whiteLabel.database,"place"));
  return loadPlace(repository);
};
