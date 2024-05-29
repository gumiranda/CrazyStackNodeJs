import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { loadMapRoute, LoadMapRoute } from "@/slices/mapRoute/useCases";

export const makeLoadMapRouteFactory = (): LoadMapRoute => {
  const repository = new MapRouteRepository(makeDatabaseInstance("mongodb", "mapRoute"));
  return loadMapRoute(repository);
};
