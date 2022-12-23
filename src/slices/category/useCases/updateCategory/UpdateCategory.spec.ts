import { UpdateCategoryRepository } from "@/slices/category/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCategoryEntity } from "@/slices/category/entities/CategoryEntity.spec";
import { UpdateCategory, updateCategory } from "./UpdateCategory";
import { cleanDataObject } from "@/application/helpers";

describe("UpdateCategory", () => {
  let fakeQuery: Query;
  let testInstance: UpdateCategory;
  let updateCategoryRepository: MockProxy<UpdateCategoryRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateCategoryRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateCategoryRepository.updateCategory.mockResolvedValue(fakeCategoryEntity);
  });
  beforeEach(() => {
    testInstance = updateCategory(updateCategoryRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateCategory of UpdateCategoryRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeCategoryEntity);
    expect(updateCategoryRepository.updateCategory).toHaveBeenCalledWith(
      fakeQuery,
      cleanDataObject({
        forbiddenFields: ["_id", "createdById", "active"],
        allowedFields: ["name", "description", "image", "updatedAt"],
        bodyObject: fakeCategoryEntity,
      })
    );
    expect(updateCategoryRepository.updateCategory).toHaveBeenCalledTimes(1);
  });
  it("should return a category updateed when updateCategoryRepository insert it", async () => {
    const category = await testInstance(fakeQuery, fakeCategoryEntity);
    expect(category).toEqual(fakeCategoryEntity);
  });
  it("should return null a new category updateed when updateCategoryRepository return it", async () => {
    updateCategoryRepository.updateCategory.mockResolvedValue(null);
    const category = await testInstance(fakeQuery, fakeCategoryEntity);
    expect(category).toBeNull();
  });
  it("should rethrow if updateCategory of UpdateCategoryRepository throws", async () => {
    updateCategoryRepository.updateCategory.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeCategoryEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
