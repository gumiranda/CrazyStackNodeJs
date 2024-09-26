import { makeDatabaseInstance } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { deleteRouteDriver, DeleteRouteDriver } from "@/slices/routeDriver/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteRouteDriverFactory = (): DeleteRouteDriver => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance(whiteLabel.database, "routeDriver")
  );
  return deleteRouteDriver(repository);
};
