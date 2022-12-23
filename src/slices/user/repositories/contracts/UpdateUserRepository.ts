import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";

export interface UpdateUserRepository {
  updateUser(query: Query, data: UserData): Promise<UserData | null>;
}
