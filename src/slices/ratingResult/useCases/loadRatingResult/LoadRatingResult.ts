import { LoadRatingResultRepository } from "@/slices/ratingResult/repositories";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { Query } from "@/application/types";

export type LoadRatingResult = (query: Query) => Promise<RatingResultData | null>;
export type LoadRatingResultSignature = (
  loadRatingResult: LoadRatingResultRepository
) => LoadRatingResult;
export const loadRatingResult: LoadRatingResultSignature =
  (loadRatingResultRepository: LoadRatingResultRepository) => async (query: Query) => {
    return loadRatingResultRepository.loadRatingResult(query);
  };
