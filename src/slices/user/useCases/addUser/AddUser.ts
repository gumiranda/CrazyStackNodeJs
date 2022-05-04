import { AddUserRepository } from "@/slices/user/repositories";
import { UserEntity, UserData } from "@/slices/user/entities";

export type AddUser = (data: UserData) => Promise<UserEntity | null>;
export type AddUserSignature = (addUser: AddUserRepository) => AddUser;
export const addUser: AddUserSignature =
    (addUserRepository: AddUserRepository) => (data: UserData) => {
        return addUserRepository.addUser(new UserEntity(data));
    };
