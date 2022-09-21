import { adaptRoute } from "@/application/adapters";
import {
  makeAddCategoryController,
  makeLoadCategoryController,
  makeDeleteCategoryController,
} from "@/slices/category/controllers";

export const addCategoryAdapter = () => adaptRoute(makeAddCategoryController());
export const loadCategoryAdapter = () => adaptRoute(makeLoadCategoryController());
export const deleteCategoryAdapter = () => adaptRoute(makeDeleteCategoryController());
