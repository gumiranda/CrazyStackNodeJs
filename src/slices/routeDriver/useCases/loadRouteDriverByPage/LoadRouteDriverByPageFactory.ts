import { MongoRepository } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import {
  loadRouteDriverByPage,
  LoadRouteDriverByPage,
} from "@/slices/routeDriver/useCases";

export const makeLoadRouteDriverByPageFactory = (): LoadRouteDriverByPage => {
  const repository = new RouteDriverRepository(new MongoRepository("routeDriver"));
  return loadRouteDriverByPage(repository);
};
