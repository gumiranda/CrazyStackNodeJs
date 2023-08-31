import { Query } from "@/application/types";
import { MapRouteData } from "@/slices/mapRoute/entities";

export interface UpdateMapRouteRepository {
  updateMapRoute(query: Query, data: MapRouteData): Promise<MapRouteData | null>;
}
