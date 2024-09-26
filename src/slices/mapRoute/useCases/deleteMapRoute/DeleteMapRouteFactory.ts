import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { deleteMapRoute, DeleteMapRoute } from "@/slices/mapRoute/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteMapRouteFactory = (): DeleteMapRoute => {
  const repository = new MapRouteRepository(
    makeDatabaseInstance(whiteLabel.database, "mapRoute")
  );
  return deleteMapRoute(repository);
};
