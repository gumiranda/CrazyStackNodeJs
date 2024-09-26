import { LoadUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query } from "@/application/types";
import { LoadPhoto } from "@/slices/photo/useCases";

export type LoadUser = (query: Query) => Promise<UserData | null>;
export type LoadUserSignature = (
  loadUser: LoadUserRepository,
  loadPhoto: LoadPhoto
) => LoadUser;
export const loadUser: LoadUserSignature =
  (loadUserRepository: LoadUserRepository, loadPhoto: LoadPhoto) =>
  async (query: Query) => {
    const user = await loadUserRepository.loadUser(query);
    if (user?.photoId) {
      const photo = await loadPhoto({ fields: { _id: user.photoId } });
      return { ...user, photo };
    }
    return user;
  };
