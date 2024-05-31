import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { updateMapRoute, UpdateMapRoute } from "@/slices/mapRoute/useCases";
import { makeMapsAdapter } from "@/application/infra/maps";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateMapRouteFactory = (): UpdateMapRoute => {
  const repository = new MapRouteRepository(
    makeDatabaseInstance(whiteLabel.database, "mapRoute")
  );
  return updateMapRoute(repository, makeMapsAdapter());
};
