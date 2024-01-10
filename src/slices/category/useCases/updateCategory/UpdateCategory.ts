import { UpdateCategoryRepository } from "@/slices/category/repositories";
import { CategoryData } from "@/slices/category/entities";
import { Query } from "@/application/types";
import { cleanDataObject } from "@/application/helpers";

export type UpdateCategory = (
  query: Query,
  data: CategoryData
) => Promise<CategoryData | null>;
export type UpdateCategorySignature = (
  updateCategory: UpdateCategoryRepository
) => UpdateCategory;
export const updateCategory: UpdateCategorySignature =
  (updateCategoryRepository: UpdateCategoryRepository) =>
  async (query: Query, data: CategoryData) => {
    return updateCategoryRepository.updateCategory(
      query,
      cleanDataObject({
        forbiddenFields: ["_id", "createdById", "active"],
        allowedFields: ["name", "description", "image", "updatedAt"],
        bodyObject: data,
      })
    );
  };
