import { Query } from "@/application/types";
import { PlacePaginated } from "@/slices/place/entities";

export interface LoadPlaceByPageGeoNearRepository {
  loadPlaceByPageGeoNear(query: Query): Promise<PlacePaginated | null>;
}
