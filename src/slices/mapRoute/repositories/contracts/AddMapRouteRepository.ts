import { MapRouteData } from "@/slices/mapRoute/entities";

export interface AddMapRouteRepository {
  addMapRoute(mapRoute: MapRouteData): Promise<MapRouteData | null>;
}
