import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { updateRouteDriver, UpdateRouteDriver } from "@/slices/routeDriver/useCases";

export const makeUpdateRouteDriverFactory = (): UpdateRouteDriver => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance(whiteLabel.database, "routeDriver")
  );
  return updateRouteDriver(repository);
};
