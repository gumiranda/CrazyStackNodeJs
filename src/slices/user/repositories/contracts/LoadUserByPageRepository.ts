import { Query } from "@/application/types";
import { UserPaginated } from "@/slices/user/entities";

export interface LoadUserByPageRepository {
    loadUserByPage(query: Query): Promise<UserPaginated | null>;
}
