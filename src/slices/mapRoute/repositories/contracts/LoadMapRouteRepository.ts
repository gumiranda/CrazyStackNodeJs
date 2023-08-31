import { Query } from "@/application/types";
import { MapRouteData } from "@/slices/mapRoute/entities";

export interface LoadMapRouteRepository {
    loadMapRoute(query: Query): Promise<MapRouteData | null>;
}
