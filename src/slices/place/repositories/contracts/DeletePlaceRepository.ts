import { Query } from "@/application/types";
import { PlaceData } from "@/slices/place/entities";

export interface DeletePlaceRepository {
    deletePlace(query: Query): Promise<PlaceData | null>;
}
