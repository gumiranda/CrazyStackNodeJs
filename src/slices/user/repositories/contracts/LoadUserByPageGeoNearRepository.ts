import { Query } from "@/application/types";
import { UserPaginated } from "@/slices/user/entities";

export interface LoadUserByPageGeoNearRepository {
    loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null>;
}
