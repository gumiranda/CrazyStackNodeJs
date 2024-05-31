import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { loadMapRoute, LoadMapRoute } from "@/slices/mapRoute/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadMapRouteFactory = (): LoadMapRoute => {
  const repository = new MapRouteRepository(
    makeDatabaseInstance(whiteLabel.database, "mapRoute")
  );
  return loadMapRoute(repository);
};
