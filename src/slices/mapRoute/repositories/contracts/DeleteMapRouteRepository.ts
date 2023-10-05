import { Query } from "@/application/types";
import { MapRouteData } from "@/slices/mapRoute/entities";

export interface DeleteMapRouteRepository {
  deleteMapRoute(query: Query): Promise<MapRouteData | null>;
}
