import { MongoRepository } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { deleteMapRoute, DeleteMapRoute } from "@/slices/mapRoute/useCases";

export const makeDeleteMapRouteFactory = (): DeleteMapRoute => {
  const repository = new MapRouteRepository(new MongoRepository("mapRoute"));
  return deleteMapRoute(repository);
};
