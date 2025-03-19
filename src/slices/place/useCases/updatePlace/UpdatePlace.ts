import { UpdatePlaceRepository } from "@/slices/place/repositories";
import { PlaceData } from "@/slices/place/entities";
import { Query } from "@/application/types";

export type UpdatePlace = (
    query: Query,
    data: PlaceData
) => Promise<PlaceData | null>;
export type UpdatePlaceSignature = (
    updatePlace: UpdatePlaceRepository
) => UpdatePlace;
export const updatePlace: UpdatePlaceSignature =
    (updatePlaceRepository: UpdatePlaceRepository) =>
    async (query: Query, data: PlaceData) => {
        return updatePlaceRepository.updatePlace(query, data);
    };
