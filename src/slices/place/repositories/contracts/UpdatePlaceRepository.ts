import { Query } from "@/application/types";
import { PlaceData } from "@/slices/place/entities";

export interface UpdatePlaceRepository {
    updatePlace(query: Query, data: PlaceData): Promise<PlaceData | null>;
}
