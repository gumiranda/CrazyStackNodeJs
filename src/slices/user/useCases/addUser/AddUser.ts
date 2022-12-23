import { AddUserRepository } from "@/slices/user/repositories";
import { UserEntity, UserData } from "@/slices/user/entities";
import { Encrypter } from "@/application/infra";

export type AddUser = (data: UserData) => Promise<UserEntity | null>;
export type AddUserSignature = (
  addUser: AddUserRepository,
  encrypter: Encrypter
) => AddUser;
export const addUser: AddUserSignature =
  (addUserRepository: AddUserRepository, encrypter: Encrypter) =>
  async (data: UserData) => {
    const hashedText = await encrypter.encrypt(data.password);
    return addUserRepository.addUser(new UserEntity({ ...data, password: hashedText }));
  };
