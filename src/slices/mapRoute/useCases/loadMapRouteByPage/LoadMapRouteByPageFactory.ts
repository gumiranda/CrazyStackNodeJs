import { MongoRepository } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { loadMapRouteByPage, LoadMapRouteByPage } from "@/slices/mapRoute/useCases";

export const makeLoadMapRouteByPageFactory = (): LoadMapRouteByPage => {
  const repository = new MapRouteRepository(new MongoRepository("mapRoute"));
  return loadMapRouteByPage(repository);
};
