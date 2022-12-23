import { LoadRatingResultByPageRepository } from "@/slices/ratingResult/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRatingResultPaginated } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { LoadRatingResultByPage, loadRatingResultByPage } from "./LoadRatingResultByPage";

describe("LoadRatingResultByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadRatingResultByPage;
  let loadRatingResultByPageRepository: MockProxy<LoadRatingResultByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadRatingResultByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadRatingResultByPageRepository.loadRatingResultByPage.mockResolvedValue(
      fakeRatingResultPaginated
    );
  });
  beforeEach(() => {
    testInstance = loadRatingResultByPage(loadRatingResultByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadRatingResultByPage of LoadRatingResultByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadRatingResultByPageRepository.loadRatingResultByPage).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadRatingResultByPageRepository.loadRatingResultByPage).toHaveBeenCalledTimes(
      1
    );
  });
  it("should return a ratingResult loaded when loadRatingResultByPageRepository insert it", async () => {
    const ratingResult = await testInstance(fakeQuery);
    expect(ratingResult).toEqual(fakeRatingResultPaginated);
  });
  it("should return null a new ratingResult loaded when loadRatingResultByPageRepository return it", async () => {
    loadRatingResultByPageRepository.loadRatingResultByPage.mockResolvedValue(null);
    const ratingResult = await testInstance(fakeQuery);
    expect(ratingResult).toBeNull();
  });
  it("should rethrow if loadRatingResultByPage of LoadRatingResultByPageRepository throws", async () => {
    loadRatingResultByPageRepository.loadRatingResultByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
