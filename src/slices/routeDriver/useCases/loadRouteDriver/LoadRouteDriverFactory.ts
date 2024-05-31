import { makeDatabaseInstance } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { loadRouteDriver, LoadRouteDriver } from "@/slices/routeDriver/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRouteDriverFactory = (): LoadRouteDriver => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance(whiteLabel.database, "routeDriver")
  );
  return loadRouteDriver(repository);
};
