import { LoadUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type LoadUser = (query: Query) => Promise<UserData | null>;
export type LoadUserSignature = (loadUser: LoadUserRepository) => LoadUser;
export const loadUser: LoadUserSignature =
    (loadUserRepository: LoadUserRepository) => async (query: Query) => {
        return loadUserRepository.loadUser(query);
    };
