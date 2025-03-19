import { PlaceData } from "@/slices/place/entities";

export interface AddPlaceRepository {
    addPlace(place: PlaceData): Promise<PlaceData | null>;
}
