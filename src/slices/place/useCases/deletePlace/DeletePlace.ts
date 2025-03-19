import { DeletePlaceRepository } from "@/slices/place/repositories";
import { PlaceData } from "@/slices/place/entities";
import { Query } from "@/application/types";

export type DeletePlace = (query: Query) => Promise<PlaceData | null>;
export type DeletePlaceSignature = (
    deletePlace: DeletePlaceRepository
) => DeletePlace;
export const deletePlace: DeletePlaceSignature =
    (deletePlaceRepository: DeletePlaceRepository) => (query: Query) => {
        return deletePlaceRepository.deletePlace(query);
    };
