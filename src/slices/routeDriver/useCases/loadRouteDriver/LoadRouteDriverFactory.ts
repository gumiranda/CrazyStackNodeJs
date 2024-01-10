import { MongoRepository } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { loadRouteDriver, LoadRouteDriver } from "@/slices/routeDriver/useCases";

export const makeLoadRouteDriverFactory = (): LoadRouteDriver => {
  const repository = new RouteDriverRepository(new MongoRepository("routeDriver"));
  return loadRouteDriver(repository);
};
