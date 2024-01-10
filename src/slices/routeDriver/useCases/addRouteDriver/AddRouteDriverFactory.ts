import { MongoRepository } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { addRouteDriver, AddRouteDriver } from "@/slices/routeDriver/useCases";

export const makeAddRouteDriverFactory = (): AddRouteDriver => {
  const repository = new RouteDriverRepository(new MongoRepository("routeDriver"));
  return addRouteDriver(repository);
};
