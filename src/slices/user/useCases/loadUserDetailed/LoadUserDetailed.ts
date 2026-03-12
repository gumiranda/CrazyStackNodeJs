import { LoadUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query } from "@/application/types";
import { LoadPhoto } from "@/slices/photo/useCases";

interface PhotoData {
  _id: string;
  url: string;
  name: string;
  type: string;
  size: number;
}

export type LoadUserDetailed = (query: Query) => Promise<
  | (UserData & {
      createdById: string;
      photo?: PhotoData;
    })
  | null
>;

export type LoadUserDetailedSignature = (
  loadUser: LoadUserRepository,
  loadPhoto: LoadPhoto
) => LoadUserDetailed;

export const loadUserDetailed: LoadUserDetailedSignature =
  (loadUserRepository: LoadUserRepository, loadPhoto: LoadPhoto) =>
  async (query: Query) => {
    const user = await loadUserRepository.loadUser(query);

    if (!user) {
      return null;
    }

    let photo: PhotoData | undefined;
    if (user.photoId) {
      photo = (await loadPhoto({ fields: { _id: user.photoId } })) as unknown as PhotoData;
    }

    return {
      ...user,
      photo,
    };
  };
