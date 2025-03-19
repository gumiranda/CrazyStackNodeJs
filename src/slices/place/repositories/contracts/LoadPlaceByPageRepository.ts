import { Query } from "@/application/types";
import { PlacePaginated } from "@/slices/place/entities";

export interface LoadPlaceByPageRepository {
    loadPlaceByPage(query: Query): Promise<PlacePaginated | null>;
}
