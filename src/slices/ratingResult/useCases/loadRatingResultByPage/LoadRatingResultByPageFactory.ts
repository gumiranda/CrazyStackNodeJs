import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import {
  loadRatingResultByPage,
  LoadRatingResultByPage,
} from "@/slices/ratingResult/useCases";

export const makeLoadRatingResultByPageFactory = (): LoadRatingResultByPage => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance("mongodb", "ratingResult")
  );
  return loadRatingResultByPage(repository);
};
