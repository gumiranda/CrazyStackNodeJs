import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";

export interface DeleteRatingResultRepository {
  deleteRatingResult(query: Query): Promise<RatingResultData | null>;
}
