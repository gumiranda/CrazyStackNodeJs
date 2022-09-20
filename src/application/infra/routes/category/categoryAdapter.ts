import { adaptRoute } from "@/application/adapters";
import { makeAddCategoryController } from "@/slices/category/controllers";

export const addCategoryAdapter = () => adaptRoute(makeAddCategoryController());
