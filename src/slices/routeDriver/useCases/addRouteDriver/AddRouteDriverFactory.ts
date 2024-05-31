import { makeDatabaseInstance } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { addRouteDriver, AddRouteDriver } from "@/slices/routeDriver/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddRouteDriverFactory = (): AddRouteDriver => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance(whiteLabel.database, "routeDriver")
  );
  return addRouteDriver(repository);
};
