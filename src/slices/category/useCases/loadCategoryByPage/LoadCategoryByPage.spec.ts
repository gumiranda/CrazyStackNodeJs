import { LoadCategoryByPageRepository } from "@/slices/category/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeCategoryPaginated } from "@/slices/category/entities/CategoryEntity.spec";
import { LoadCategoryByPage, loadCategoryByPage } from "./LoadCategoryByPage";

describe("LoadCategoryByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadCategoryByPage;
  let loadCategoryByPageRepository: MockProxy<LoadCategoryByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadCategoryByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadCategoryByPageRepository.loadCategoryByPage.mockResolvedValue(
      fakeCategoryPaginated
    );
  });
  beforeEach(() => {
    testInstance = loadCategoryByPage(loadCategoryByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadCategoryByPage of LoadCategoryByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadCategoryByPageRepository.loadCategoryByPage).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadCategoryByPageRepository.loadCategoryByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a category loaded when loadCategoryByPageRepository insert it", async () => {
    const category = await testInstance(fakeQuery);
    expect(category).toEqual(fakeCategoryPaginated);
  });
  it("should return null a new category loaded when loadCategoryByPageRepository return it", async () => {
    loadCategoryByPageRepository.loadCategoryByPage.mockResolvedValue(null);
    const category = await testInstance(fakeQuery);
    expect(category).toBeNull();
  });
  it("should rethrow if loadCategoryByPage of LoadCategoryByPageRepository throws", async () => {
    loadCategoryByPageRepository.loadCategoryByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
