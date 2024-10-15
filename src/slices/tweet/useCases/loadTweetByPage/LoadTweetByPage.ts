import { LoadTweetByPageRepository } from "@/slices/tweet/repositories";
import { TweetPaginated } from "@/slices/tweet/entities";
import { Query } from "@/application/types";

export type LoadTweetByPage = (query: Query) => Promise<TweetPaginated | null>;
export type LoadTweetByPageSignature = (
    loadTweetByPage: LoadTweetByPageRepository
) => LoadTweetByPage;
export const loadTweetByPage: LoadTweetByPageSignature =
    (loadTweetByPageRepository: LoadTweetByPageRepository) =>
    async (query: Query) => {
        return loadTweetByPageRepository.loadTweetByPage(query);
    };
