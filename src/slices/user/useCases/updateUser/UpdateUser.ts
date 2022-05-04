import { UpdateUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type UpdateUser = (
    query: Query,
    data: UserData
) => Promise<UserData | null>;
export type UpdateUserSignature = (
    updateUser: UpdateUserRepository
) => UpdateUser;
export const updateUser: UpdateUserSignature =
    (updateUserRepository: UpdateUserRepository) =>
    async (query: Query, data: UserData) => {
        return updateUserRepository.updateUser(query, data);
    };
