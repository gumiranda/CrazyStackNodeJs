import { LoadRatingByPageRepository } from "@/slices/rating/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRatingPaginated } from "@/slices/rating/entities/RatingEntity.spec";
import { LoadRatingByPage, loadRatingByPage } from "./LoadRatingByPage";

describe("LoadRatingByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadRatingByPage;
  let loadRatingByPageRepository: MockProxy<LoadRatingByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadRatingByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadRatingByPageRepository.loadRatingByPage.mockResolvedValue(fakeRatingPaginated);
  });
  beforeEach(() => {
    testInstance = loadRatingByPage(loadRatingByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadRatingByPage of LoadRatingByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadRatingByPageRepository.loadRatingByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadRatingByPageRepository.loadRatingByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a rating loaded when loadRatingByPageRepository insert it", async () => {
    const rating = await testInstance(fakeQuery);
    expect(rating).toEqual(fakeRatingPaginated);
  });
  it("should return null a new rating loaded when loadRatingByPageRepository return it", async () => {
    loadRatingByPageRepository.loadRatingByPage.mockResolvedValue(null);
    const rating = await testInstance(fakeQuery);
    expect(rating).toBeNull();
  });
  it("should rethrow if loadRatingByPage of LoadRatingByPageRepository throws", async () => {
    loadRatingByPageRepository.loadRatingByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
