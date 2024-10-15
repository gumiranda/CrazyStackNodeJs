import { UpdateTrendRepository } from "@/slices/social-network/trend/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTrendEntity } from "@/slices/social-network/trend/entities/TrendEntity.spec";
import { UpdateTrend, updateTrend } from "./UpdateTrend";

describe("UpdateTrend", () => {
  let fakeQuery: Query;
  let testInstance: UpdateTrend;
  let updateTrendRepository: MockProxy<UpdateTrendRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTrendRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateTrendRepository.updateTrend.mockResolvedValue(fakeTrendEntity);
  });
  beforeEach(() => {
    testInstance = updateTrend(updateTrendRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateTrend of UpdateTrendRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeTrendEntity);
    expect(updateTrendRepository.updateTrend).toHaveBeenCalledWith(
      fakeQuery,
      fakeTrendEntity
    );
    expect(updateTrendRepository.updateTrend).toHaveBeenCalledTimes(1);
  });
  it("should return a trend updateed when updateTrendRepository insert it", async () => {
    const trend = await testInstance(fakeQuery, fakeTrendEntity);
    expect(trend).toEqual(fakeTrendEntity);
  });
  it("should return null a new trend updateed when updateTrendRepository return it", async () => {
    updateTrendRepository.updateTrend.mockResolvedValue(null);
    const trend = await testInstance(fakeQuery, fakeTrendEntity);
    expect(trend).toBeNull();
  });
  it("should rethrow if updateTrend of UpdateTrendRepository throws", async () => {
    updateTrendRepository.updateTrend.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeTrendEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
