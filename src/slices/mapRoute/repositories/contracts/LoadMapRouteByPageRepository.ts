import { Query } from "@/application/types";
import { MapRoutePaginated } from "@/slices/mapRoute/entities";

export interface LoadMapRouteByPageRepository {
    loadMapRouteByPage(query: Query): Promise<MapRoutePaginated | null>;
}
