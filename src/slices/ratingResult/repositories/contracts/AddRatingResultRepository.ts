import { RatingResultData } from "@/slices/ratingResult/entities";

export interface AddRatingResultRepository {
    addRatingResult(ratingResult: RatingResultData): Promise<RatingResultData | null>;
}
