import { fakeTrendEntity } from "@/slices/trend/entities/TrendEntity.spec";
import { TrendEntity } from "@/slices/trend/entities";
import { AddTrendRepository } from "@/slices/trend/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addTrend } from "./AddTrend";

describe("addTrend", () => {
    let testInstance: any;
    let addTrendRepository: MockProxy<AddTrendRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addTrendRepository = mock();
        addTrendRepository.addTrend.mockResolvedValue(fakeTrendEntity);
    });
    beforeEach(() => {
        testInstance = addTrend(addTrendRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addTrend of AddTrendRepository with correct values", async () => {
        await testInstance(fakeTrendEntity);
        expect(addTrendRepository.addTrend).toHaveBeenCalledWith(
            new TrendEntity(fakeTrendEntity)
        );
        expect(addTrendRepository.addTrend).toHaveBeenCalledTimes(1);
    });
    it("should return a new trend created when addTrendRepository insert it", async () => {
        const trend = await testInstance(fakeTrendEntity);
        expect(trend).toEqual(fakeTrendEntity);
    });
    it("should return null a new trend created when addTrendRepository insert it", async () => {
        addTrendRepository.addTrend.mockResolvedValue(null);
        const trend = await testInstance(fakeTrendEntity);
        expect(trend).toBeNull();
    });
    it("should rethrow if addTrend of AddTrendRepository throws", async () => {
        addTrendRepository.addTrend.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeTrendEntity)).rejects.toThrowError("any_error");
    });
});
