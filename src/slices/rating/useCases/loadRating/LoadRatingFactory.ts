import { MongoRepository } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { loadRating, LoadRating } from "@/slices/rating/useCases";

export const makeLoadRatingFactory = (): LoadRating => {
  const repository = new RatingRepository(new MongoRepository("rating"));
  return loadRating(repository);
};
