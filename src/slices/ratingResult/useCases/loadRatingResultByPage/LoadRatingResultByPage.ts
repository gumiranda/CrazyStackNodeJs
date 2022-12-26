import { LoadRatingResultByPageRepository } from "@/slices/ratingResult/repositories";
import { RatingResultPaginated } from "@/slices/ratingResult/entities";
import { Query } from "@/application/types";

export type LoadRatingResultByPage = (query: Query) => Promise<RatingResultPaginated | null>;
export type LoadRatingResultByPageSignature = (
    loadRatingResultByPage: LoadRatingResultByPageRepository
) => LoadRatingResultByPage;
export const loadRatingResultByPage: LoadRatingResultByPageSignature =
    (loadRatingResultByPageRepository: LoadRatingResultByPageRepository) =>
    async (query: Query) => {
        return loadRatingResultByPageRepository.loadRatingResultByPage(query);
    };
