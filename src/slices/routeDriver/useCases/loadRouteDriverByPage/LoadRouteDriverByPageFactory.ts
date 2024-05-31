import { makeDatabaseInstance } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import {
  loadRouteDriverByPage,
  LoadRouteDriverByPage,
} from "@/slices/routeDriver/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRouteDriverByPageFactory = (): LoadRouteDriverByPage => {
  const repository = new RouteDriverRepository(
    makeDatabaseInstance(whiteLabel.database, "routeDriver")
  );
  return loadRouteDriverByPage(repository);
};
