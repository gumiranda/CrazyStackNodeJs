import { makeDatabaseInstance } from "@/application/infra";
import { MapRouteRepository } from "@/slices/mapRoute/repositories";
import { addMapRoute, AddMapRoute } from "@/slices/mapRoute/useCases";
import { makeMapsAdapter } from "@/application/infra/maps";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddMapRouteFactory = (): AddMapRoute => {
  const repository = new MapRouteRepository(
    makeDatabaseInstance(whiteLabel.database, "mapRoute")
  );
  return addMapRoute(repository, makeMapsAdapter());
};
