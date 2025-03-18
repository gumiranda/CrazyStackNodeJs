import { fakeTrendEntity } from "@/slices/social-network/trend/entities/TrendEntity.spec";
import { TrendEntity } from "@/slices/social-network/trend/entities";
import { DeleteTrendRepository } from "@/slices/social-network/trend/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteTrend } from "./DeleteTrend";
import { Query } from "@/application/types";

describe("deleteTrend", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteTrendRepository: MockProxy<DeleteTrendRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteTrendRepository = mock();
    fakeQuery = { fields: { hashtag: "123" }, options: {} };
    deleteTrendRepository.deleteTrend.mockResolvedValue(fakeTrendEntity);
  });
  beforeEach(() => {
    testInstance = deleteTrend(deleteTrendRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteTrend of DeleteTrendRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteTrendRepository.deleteTrend).toHaveBeenCalledWith(fakeQuery);
    expect(deleteTrendRepository.deleteTrend).toHaveBeenCalledTimes(1);
  });
  it("should return a new trend deleted when deleteTrendRepository delete it", async () => {
    const trend = await testInstance(fakeQuery);
    expect(trend).toEqual(fakeTrendEntity);
  });
  it("should return null a new trend deleted when deleteTrendRepository delete it", async () => {
    deleteTrendRepository.deleteTrend.mockResolvedValue(null);
    const trend = await testInstance(fakeTrendEntity);
    expect(trend).toBeNull();
  });
  it("should rethrow if deleteTrend of DeleteTrendRepository throws", async () => {
    deleteTrendRepository.deleteTrend.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
