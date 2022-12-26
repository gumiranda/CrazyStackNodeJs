import { LoadUserByPageGeoNearRepository } from "@/slices/user/repositories";
import { UserPaginated } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type LoadUserByPageGeoNear = (query: Query) => Promise<UserPaginated | null>;
export type LoadUserByPageGeoNearSignature = (
    loadUserByPageGeoNear: LoadUserByPageGeoNearRepository
) => LoadUserByPageGeoNear;
export const loadUserByPageGeoNear: LoadUserByPageGeoNearSignature =
    (loadUserByPageGeoNearRepository: LoadUserByPageGeoNearRepository) =>
    async (query: Query) => {
        return loadUserByPageGeoNearRepository.loadUserByPageGeoNear(query);
    };
