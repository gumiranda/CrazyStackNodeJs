import { MongoRepository } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { updateMapRoute, UpdateMapRoute } from "@/slices/mapRoute/useCases";

export const makeUpdateMapRouteFactory = (): UpdateMapRoute => {
  const repository = new MapRouteRepository(new MongoRepository("mapRoute"));
  return updateMapRoute(repository);
};
