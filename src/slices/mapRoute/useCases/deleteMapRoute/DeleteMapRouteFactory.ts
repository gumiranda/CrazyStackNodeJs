import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { deleteMapRoute, DeleteMapRoute } from "@/slices/mapRoute/useCases";

export const makeDeleteMapRouteFactory = (): DeleteMapRoute => {
  const repository = new MapRouteRepository(makeDatabaseInstance("mongodb", "mapRoute"));
  return deleteMapRoute(repository);
};
