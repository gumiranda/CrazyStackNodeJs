import { MongoRepository } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { loadRatingByPage, LoadRatingByPage } from "@/slices/rating/useCases";

export const makeLoadRatingByPageFactory = (): LoadRatingByPage => {
  const repository = new RatingRepository(new MongoRepository("rating"));
  return loadRatingByPage(repository);
};
