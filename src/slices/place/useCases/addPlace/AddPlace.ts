import { AddPlaceRepository } from "@/slices/place/repositories";
import { PlaceEntity, PlaceData } from "@/slices/place/entities";

export type AddPlace = (data: PlaceData) => Promise<PlaceEntity | null>;
export type AddPlaceSignature = (addPlace: AddPlaceRepository) => AddPlace;
export const addPlace: AddPlaceSignature =
    (addPlaceRepository: AddPlaceRepository) => (data: PlaceData) => {
        return addPlaceRepository.addPlace(new PlaceEntity(data));
    };
