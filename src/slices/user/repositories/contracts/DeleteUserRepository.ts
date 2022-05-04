import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";

export interface DeleteUserRepository {
    deleteUser(query: Query): Promise<UserData | null>;
}
