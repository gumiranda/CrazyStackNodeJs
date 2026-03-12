import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { CategoryRepository } from "./categoryRepository";
import { fakeCategoryEntity, fakeCategoryPaginated } from "@/slices/category/entities/CategoryEntity.spec";

describe("CategoryRepository", () => {
  let fakeQuery: Query;
  let testInstance: CategoryRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    repository = mock<Repository>();
    fakeQuery = { fields: { name: "123" }, options: {} };
    repository.add.mockResolvedValue(fakeCategoryEntity);
    repository.getOne.mockResolvedValue(fakeCategoryEntity);
    repository.update.mockResolvedValue(fakeCategoryEntity);
    repository.getPaginate.mockResolvedValue(fakeCategoryPaginated?.categorys);
    repository.getCount.mockResolvedValue(fakeCategoryPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(() => {
    testInstance = new CategoryRepository(repository);
  });
  afterAll(() => { MockDate.reset(); });
  test("should call add of addCategory with correct values", async () => {
    await testInstance.addCategory(fakeCategoryEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeCategoryEntity);
  });
  test("should return a new category when addCategory inserts it", async () => {
    const result = await testInstance.addCategory(fakeCategoryEntity);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return null when addCategory returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addCategory(fakeCategoryEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if addCategory throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.addCategory(fakeCategoryEntity)).rejects.toThrow("Error");
  });
  test("should call deleteOne with correct values", async () => {
    await testInstance.deleteCategory(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return null when deleteCategory returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteCategory(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if deleteCategory throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.deleteCategory(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getOne of loadCategory with correct values", async () => {
    await testInstance.loadCategory(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
  });
  test("should return a category when loadCategory loads it", async () => {
    const result = await testInstance.loadCategory(fakeQuery);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return null when loadCategory returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadCategory(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if loadCategory throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadCategory(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getPaginate of loadCategoryByPage with correct values", async () => {
    await testInstance.loadCategoryByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, fakeQuery?.fields, { createdAt: -1 }, 10, {});
  });
  test("should return paginated categories", async () => {
    const result = await testInstance.loadCategoryByPage(fakeQuery);
    expect(result).toEqual(fakeCategoryPaginated);
  });
  test("should return null when loadCategoryByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadCategoryByPage(fakeQuery);
    expect(result).toEqual({ categorys: null, total: 0 });
  });
  test("should rethrow if loadCategoryByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadCategoryByPage(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call update of updateCategory with correct values", async () => {
    await testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeCategoryEntity);
  });
  test("should return updated category", async () => {
    const result = await testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    expect(result).toEqual(fakeCategoryEntity);
  });
  test("should return null when updateCategory returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateCategory(fakeQuery, fakeCategoryEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if updateCategory throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.updateCategory(fakeQuery, fakeCategoryEntity)).rejects.toThrow("Error");
  });
});
