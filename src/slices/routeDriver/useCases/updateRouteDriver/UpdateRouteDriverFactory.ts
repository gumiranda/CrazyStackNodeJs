import { makeDatabaseInstance } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { updateRouteDriver, UpdateRouteDriver } from "@/slices/routeDriver/useCases";

export const makeUpdateRouteDriverFactory = (): UpdateRouteDriver => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance("mongodb", "routeDriver")
  );
  return updateRouteDriver(repository);
};
