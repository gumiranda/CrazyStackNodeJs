import { Query } from "@/application/types";
import { RatingResultAverage } from "@/slices/ratingResult/entities";

export interface LoadAverageRatingResultRepository {
  loadAverageRatingResult(query: Query): Promise<RatingResultAverage | null>;
}
