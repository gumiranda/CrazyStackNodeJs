import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { updateMapRoute, UpdateMapRoute } from "@/slices/mapRoute/useCases";
import { makeMapsAdapter } from "@/application/infra/maps";

export const makeUpdateMapRouteFactory = (): UpdateMapRoute => {
  const repository = new MapRouteRepository(makeDatabaseInstance("mongodb", "mapRoute"));
  return updateMapRoute(repository, makeMapsAdapter());
};
