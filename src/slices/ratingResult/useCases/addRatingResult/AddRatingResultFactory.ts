import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { addRatingResult, AddRatingResult } from "@/slices/ratingResult/useCases";

export const makeAddRatingResultFactory = (): AddRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return addRatingResult(repository);
};
