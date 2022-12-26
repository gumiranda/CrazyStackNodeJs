import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";

export interface LoadUserRepository {
    loadUser(query: Query): Promise<UserData | null>;
}
