import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { loadRatingByPage, LoadRatingByPage } from "@/slices/rating/useCases";

export const makeLoadRatingByPageFactory = (): LoadRatingByPage => {
  const repository = new RatingRepository(makeDatabaseInstance("mongodb", "rating"));
  return loadRatingByPage(repository);
};
