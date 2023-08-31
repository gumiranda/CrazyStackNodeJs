import { MongoRepository } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { loadMapRoute, LoadMapRoute } from "@/slices/mapRoute/useCases";

export const makeLoadMapRouteFactory = (): LoadMapRoute => {
  const repository = new MapRouteRepository(new MongoRepository("mapRoute"));
  return loadMapRoute(repository);
};
