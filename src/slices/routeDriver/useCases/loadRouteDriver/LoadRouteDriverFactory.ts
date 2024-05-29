import { makeDatabaseInstance } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { loadRouteDriver, LoadRouteDriver } from "@/slices/routeDriver/useCases";

export const makeLoadRouteDriverFactory = (): LoadRouteDriver => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance("mongodb", "routeDriver")
  );
  return loadRouteDriver(repository);
};
