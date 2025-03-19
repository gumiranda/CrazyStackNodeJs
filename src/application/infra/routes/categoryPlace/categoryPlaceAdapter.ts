import { adaptRoute } from "@/application/adapters";
import {
  makeAddCategoryPlaceController,
  makeLoadCategoryPlaceController,
  makeDeleteCategoryPlaceController,
  makeUpdateCategoryPlaceController,
  makeLoadCategoryPlaceByPageController,
} from "@/slices/categoryPlace/controllers";

export const addCategoryPlaceAdapter = () => adaptRoute(makeAddCategoryPlaceController());
export const loadCategoryPlaceAdapter = () => adaptRoute(makeLoadCategoryPlaceController());
export const loadCategoryPlaceByPageAdapter = () =>
  adaptRoute(makeLoadCategoryPlaceByPageController());
export const deleteCategoryPlaceAdapter = () => adaptRoute(makeDeleteCategoryPlaceController());
export const updateCategoryPlaceAdapter = () => adaptRoute(makeUpdateCategoryPlaceController());
