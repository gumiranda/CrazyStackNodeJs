import { adaptRoute } from "@/application/adapters";
import {
  makeAddRatingController,
  makeLoadRatingController,
  makeDeleteRatingController,
  makeUpdateRatingController,
  makeLoadRatingByPageController,
} from "@/slices/rating/controllers";

export const addRatingAdapter = () => adaptRoute(makeAddRatingController());
export const loadRatingAdapter = () => adaptRoute(makeLoadRatingController());
export const loadRatingByPageAdapter = () => adaptRoute(makeLoadRatingByPageController());
export const deleteRatingAdapter = () => adaptRoute(makeDeleteRatingController());
export const updateRatingAdapter = () => adaptRoute(makeUpdateRatingController());
