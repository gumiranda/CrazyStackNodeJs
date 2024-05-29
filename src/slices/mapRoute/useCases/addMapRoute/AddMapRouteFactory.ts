import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { addMapRoute, AddMapRoute } from "@/slices/mapRoute/useCases";
import { makeMapsAdapter } from "@/application/infra/maps";

export const makeAddMapRouteFactory = (): AddMapRoute => {
  const repository = new MapRouteRepository(makeDatabaseInstance("mongodb", "mapRoute"));
  return addMapRoute(repository, makeMapsAdapter());
};
