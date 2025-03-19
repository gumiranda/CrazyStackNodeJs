import { LoadPlaceRepository } from "@/slices/place/repositories";
import { PlaceData } from "@/slices/place/entities";
import { Query } from "@/application/types";

export type LoadPlace = (query: Query) => Promise<PlaceData | null>;
export type LoadPlaceSignature = (loadPlace: LoadPlaceRepository) => LoadPlace;
export const loadPlace: LoadPlaceSignature =
    (loadPlaceRepository: LoadPlaceRepository) => async (query: Query) => {
        return loadPlaceRepository.loadPlace(query);
    };
