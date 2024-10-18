import { LoadTrendRepository } from "@/slices/trend/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTrendEntity } from "@/slices/trend/entities/TrendEntity.spec";
import { LoadTrend, loadTrend } from "./LoadTrend";

describe("LoadTrend", () => {
    let fakeQuery: Query;
    let testInstance: LoadTrend;
    let loadTrendRepository: MockProxy<LoadTrendRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadTrendRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadTrendRepository.loadTrend.mockResolvedValue(fakeTrendEntity);
    });
    beforeEach(() => {
        testInstance = loadTrend(loadTrendRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadTrend of LoadTrendRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadTrendRepository.loadTrend).toHaveBeenCalledWith(fakeQuery);
        expect(loadTrendRepository.loadTrend).toHaveBeenCalledTimes(1);
    });
    it("should return a trend loaded when loadTrendRepository insert it", async () => {
        const trend = await testInstance(fakeQuery);
        expect(trend).toEqual(fakeTrendEntity);
    });
    it("should return null a new trend loaded when loadTrendRepository return it", async () => {
        loadTrendRepository.loadTrend.mockResolvedValue(null);
        const trend = await testInstance(fakeQuery);
        expect(trend).toBeNull();
    });
    it("should rethrow if loadTrend of LoadTrendRepository throws", async () => {
        loadTrendRepository.loadTrend.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
