import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";

export interface LoadRatingResultRepository {
  loadRatingResult(query: Query): Promise<RatingResultData | null>;
}
