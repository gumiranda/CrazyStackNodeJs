import { DeleteUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type DeleteUser = (query: Query) => Promise<UserData | null>;
export type DeleteUserSignature = (
    deleteUser: DeleteUserRepository
) => DeleteUser;
export const deleteUser: DeleteUserSignature =
    (deleteUserRepository: DeleteUserRepository) => (query: Query) => {
        return deleteUserRepository.deleteUser(query);
    };
