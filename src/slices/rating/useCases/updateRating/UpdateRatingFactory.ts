import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { updateRating, UpdateRating } from "@/slices/rating/useCases";

export const makeUpdateRatingFactory = (): UpdateRating => {
  const repository = new RatingRepository(makeDatabaseInstance("mongodb", "rating"));
  return updateRating(repository);
};
