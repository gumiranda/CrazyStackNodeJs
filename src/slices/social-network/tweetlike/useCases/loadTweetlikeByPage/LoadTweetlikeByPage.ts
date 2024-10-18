import { LoadTweetlikeByPageRepository } from "@/slices/tweetlike/repositories";
import { TweetlikePaginated } from "@/slices/tweetlike/entities";
import { Query } from "@/application/types";

export type LoadTweetlikeByPage = (query: Query) => Promise<TweetlikePaginated | null>;
export type LoadTweetlikeByPageSignature = (
    loadTweetlikeByPage: LoadTweetlikeByPageRepository
) => LoadTweetlikeByPage;
export const loadTweetlikeByPage: LoadTweetlikeByPageSignature =
    (loadTweetlikeByPageRepository: LoadTweetlikeByPageRepository) =>
    async (query: Query) => {
        return loadTweetlikeByPageRepository.loadTweetlikeByPage(query);
    };
