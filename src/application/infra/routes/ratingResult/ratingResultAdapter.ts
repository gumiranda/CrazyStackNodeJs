import { adaptRoute } from "@/application/adapters";
import {
  makeAddRatingResultController,
  makeLoadRatingResultController,
  makeDeleteRatingResultController,
  makeUpdateRatingResultController,
  makeLoadRatingResultByPageController,
} from "@/slices/ratingResult/controllers";

export const addRatingResultAdapter = () => adaptRoute(makeAddRatingResultController());
export const loadRatingResultAdapter = () => adaptRoute(makeLoadRatingResultController());
export const loadRatingResultByPageAdapter = () =>
  adaptRoute(makeLoadRatingResultByPageController());
export const deleteRatingResultAdapter = () => adaptRoute(makeDeleteRatingResultController());
export const updateRatingResultAdapter = () => adaptRoute(makeUpdateRatingResultController());
