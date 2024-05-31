import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { loadMapRouteByPage, LoadMapRouteByPage } from "@/slices/mapRoute/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadMapRouteByPageFactory = (): LoadMapRouteByPage => {
  const repository = new MapRouteRepository(
    makeDatabaseInstance(whiteLabel.database, "mapRoute")
  );
  return loadMapRouteByPage(repository);
};
