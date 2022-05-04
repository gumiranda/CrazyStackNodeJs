import { UserData } from "@/slices/user/entities";

export interface AddUserRepository {
    addUser(user: UserData): Promise<UserData | null>;
}
