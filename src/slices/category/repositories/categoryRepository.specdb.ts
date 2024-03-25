import {
  fakeCategoryEntity,
  fakeCategoryPaginated,
} from "@/slices/category/entities/CategoryEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";

import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { CategoryRepository } from "./categoryRepository";

describe("Category Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: CategoryRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeCategoryEntity);
    repository.getOne.mockResolvedValue(fakeCategoryEntity);
    repository.update.mockResolvedValue(fakeCategoryEntity);
    repository.getPaginate.mockResolvedValue(fakeCategoryPaginated?.categorys);
    repository.getCount.mockResolvedValue(fakeCategoryPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new CategoryRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addCategory with correct values", async () => {
    await testInstance.addCategory(fakeCategoryEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeCategoryEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new category created when addCategory insert it", async () => {
    const result = await testInstance.addCategory(fakeCategoryEntity);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return null when addCategory returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addCategory(fakeCategoryEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addCategory throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addCategory(fakeCategoryEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateCategory throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateCategory with correct values", async () => {
    await testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeCategoryEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a category updated when updateCategory update it", async () => {
    const result = await testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return a category updated when updateCategory update it when i pass null", async () => {
    const result = await testInstance.updateCategory(null as any, fakeCategoryEntity);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return null when updateCategory returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateCategory throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteCategory with correct values", async () => {
    await testInstance.deleteCategory(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new category created when deleteCategory insert it", async () => {
    const result = await testInstance.deleteCategory(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteCategory returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteCategory(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteCategory throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteCategory(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadCategory with correct values", async () => {
    await testInstance.loadCategory(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a category when loadCategory loaded it", async () => {
    const result = await testInstance.loadCategory(fakeQuery);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return null when loadCategory returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCategory(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadCategory returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCategory(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadCategory throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCategory(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadCategoryByPage with correct values", async () => {
    await testInstance.loadCategoryByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadCategoryByPage with correct values", async () => {
    await testInstance.loadCategoryByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a categoryByPage when loadCategoryByPage loaded it", async () => {
    const result = await testInstance.loadCategoryByPage(fakeQuery);
    expect(result).toEqual(fakeCategoryPaginated);
  });
  test("should return null when loadCategoryByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCategoryByPage(fakeQuery);
    expect(result).toEqual({ categorys: null, total: 0 });
  });
  test("should return null when loadCategoryByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCategoryByPage(null as any);
    expect(result).toEqual({ categorys: null, total: 0 });
  });
  test("should rethrow if load of loadCategoryByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadCategoryByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
