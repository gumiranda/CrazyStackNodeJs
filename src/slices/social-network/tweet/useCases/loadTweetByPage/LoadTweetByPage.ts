import { LoadTweetByPageRepository } from "@/slices/social-network/tweet/repositories";
import { TweetPaginated } from "@/slices/social-network/tweet/entities";
import { Query } from "@/application/types";

export type LoadTweetByPage = (query: Query) => Promise<TweetPaginated | null>;
export type LoadTweetByPageSignature = (
  loadTweetByPage: LoadTweetByPageRepository
) => LoadTweetByPage;
export const loadTweetByPage: LoadTweetByPageSignature =
  (loadTweetByPageRepository: LoadTweetByPageRepository) => async (query: Query) => {
    return loadTweetByPageRepository.loadTweetByPage(query);
  };
