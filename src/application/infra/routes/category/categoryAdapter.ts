import { adaptRoute } from "@/application/adapters";
import {
  makeAddCategoryController,
  makeLoadCategoryController,
} from "@/slices/category/controllers";

export const addCategoryAdapter = () => adaptRoute(makeAddCategoryController());
export const loadCategoryAdapter = () => adaptRoute(makeLoadCategoryController());
