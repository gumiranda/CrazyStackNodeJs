import { adaptRoute } from "@/application/adapters";
import {
  makeAddCategoryController,
  makeLoadCategoryController,
  makeDeleteCategoryController,
  makeUpdateCategoryController,
  makeLoadCategoryByPageController,
} from "@/slices/category/controllers";

export const addCategoryAdapter = () => adaptRoute(makeAddCategoryController());
export const loadCategoryAdapter = () => adaptRoute(makeLoadCategoryController());
export const loadCategoryByPageAdapter = () =>
  adaptRoute(makeLoadCategoryByPageController());
export const deleteCategoryAdapter = () => adaptRoute(makeDeleteCategoryController());
export const updateCategoryAdapter = () => adaptRoute(makeUpdateCategoryController());
