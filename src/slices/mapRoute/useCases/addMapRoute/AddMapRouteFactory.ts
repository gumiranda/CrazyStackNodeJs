import { MongoRepository } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { addMapRoute, AddMapRoute } from "@/slices/mapRoute/useCases";
import { makeMapsAdapter } from "@/application/infra/maps";

export const makeAddMapRouteFactory = (): AddMapRoute => {
  const repository = new MapRouteRepository(new MongoRepository("mapRoute"));
  return addMapRoute(repository, makeMapsAdapter());
};
