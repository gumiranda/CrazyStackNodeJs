import { Query } from "@/application/types";
import { PlaceData } from "@/slices/place/entities";

export interface LoadPlaceRepository {
    loadPlace(query: Query): Promise<PlaceData | null>;
}
