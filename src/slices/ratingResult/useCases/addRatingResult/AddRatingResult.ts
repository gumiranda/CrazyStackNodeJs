import { AddRatingResultRepository } from "@/slices/ratingResult/repositories";
import { RatingResultEntity, RatingResultData } from "@/slices/ratingResult/entities";

export type AddRatingResult = (
  data: RatingResultData
) => Promise<RatingResultEntity | null>;
export type AddRatingResultSignature = (
  addRatingResult: AddRatingResultRepository
) => AddRatingResult;
export const addRatingResult: AddRatingResultSignature =
  (addRatingResultRepository: AddRatingResultRepository) => (data: RatingResultData) => {
    return addRatingResultRepository.addRatingResult(new RatingResultEntity(data));
  };
