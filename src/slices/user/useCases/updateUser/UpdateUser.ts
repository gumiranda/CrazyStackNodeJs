import { UpdateUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query, Optional } from "@/application/types";

type UpdateUserDataInput = Optional<
  UserData,
  "createdById" | "name" | "email" | "password" | "role"
>;

export type UpdateUser = (
  query: Query,
  data: UpdateUserDataInput
) => Promise<UserData | null>;
export type UpdateUserSignature = (updateUser: UpdateUserRepository) => UpdateUser;
export const updateUser: UpdateUserSignature =
  (updateUserRepository: UpdateUserRepository) =>
  async (query: Query, data: UpdateUserDataInput) => {
    return updateUserRepository.updateUser(query, data);
  };
