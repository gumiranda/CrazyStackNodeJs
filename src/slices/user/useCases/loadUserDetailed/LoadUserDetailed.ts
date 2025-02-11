import { LoadUserRepository } from "@/slices/user/repositories";
import { UserData } from "@/slices/user/entities";
import { Query } from "@/application/types";
import { LoadPhoto } from "@/slices/photo/useCases";
import type { GetCountFollowRepository } from "@/slices/social-network/follow/repositories";
import type { GetCountTweetRepository } from "@/slices/social-network/tweet/repositories";

// Definir o tipo correto para photo, para evitar o uso de `any`
interface PhotoData {
  _id: string;
  url: string;
  name: string;
  type: string;
  size: number;
}

export type LoadUserDetailed = (query: Query) => Promise<
  | (UserData & {
      followings: number;
      followers: number;
      tweets: number;
      createdById: string;
      photo?: PhotoData; // Usar o tipo correto aqui
    })
  | null
>;

export type LoadUserDetailedSignature = (
  loadUser: LoadUserRepository,
  loadPhoto: LoadPhoto,
  followRepository: GetCountFollowRepository,
  tweetRepository: GetCountTweetRepository
) => LoadUserDetailed;

export const loadUserDetailed: LoadUserDetailedSignature =
  (
    loadUserRepository: LoadUserRepository,
    loadPhoto: LoadPhoto,
    followRepository: GetCountFollowRepository,
    tweetRepository: GetCountTweetRepository
  ) =>
  async (query: Query) => {
    const [user, followingsResult, followersResult, tweetsResult] = await Promise.all([
      loadUserRepository.loadUser(query),
      followRepository.getCountFollow({ fields: { createdById: query.fields._id } }),
      followRepository.getCountFollow({ fields: { userId: query.fields._id } }),
      tweetRepository.getCountTweet({ fields: { createdById: query.fields._id } }),
    ]);
    const followings = followingsResult ?? 0;
    const followers = followersResult ?? 0;
    const tweets = tweetsResult ?? 0;
    if (!user) {
      return null;
    }
    let photo: PhotoData | undefined;
    if (user?.photoId) {
      photo = (await loadPhoto({ fields: { _id: user.photoId } })) as unknown as PhotoData;
    }
    // Retornar o usuário com os dados corretos
    return {
      ...user,
      followings,
      followers,
      tweets,
      photo, // Garantir que `photo` seja do tipo correto ou undefined
    };
  };
