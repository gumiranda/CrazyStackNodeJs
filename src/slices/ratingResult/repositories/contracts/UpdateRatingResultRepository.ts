import { Query } from "@/application/types";
import { RatingResultData } from "@/slices/ratingResult/entities";

export interface UpdateRatingResultRepository {
    updateRatingResult(query: Query, data: RatingResultData): Promise<RatingResultData | null>;
}
