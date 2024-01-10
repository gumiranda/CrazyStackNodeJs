import { MongoRepository } from "@/application/infra";
import { RouteDriverRepository } from "@/slices/routeDriver/repositories";
import { deleteRouteDriver, DeleteRouteDriver } from "@/slices/routeDriver/useCases";

export const makeDeleteRouteDriverFactory = (): DeleteRouteDriver => {
  const repository = new RouteDriverRepository(new MongoRepository("routeDriver"));
  return deleteRouteDriver(repository);
};
