import { LoadTrendByPageRepository } from "@/slices/trend/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeTrendPaginated } from "@/slices/trend/entities/TrendEntity.spec";
import { LoadTrendByPage, loadTrendByPage } from "./LoadTrendByPage";

describe("LoadTrendByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadTrendByPage;
    let loadTrendByPageRepository: MockProxy<LoadTrendByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadTrendByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadTrendByPageRepository.loadTrendByPage.mockResolvedValue(
            fakeTrendPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadTrendByPage(loadTrendByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadTrendByPage of LoadTrendByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadTrendByPageRepository.loadTrendByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadTrendByPageRepository.loadTrendByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a trend loaded when loadTrendByPageRepository insert it", async () => {
        const trend = await testInstance(fakeQuery);
        expect(trend).toEqual(fakeTrendPaginated);
    });
    it("should return null a new trend loaded when loadTrendByPageRepository return it", async () => {
        loadTrendByPageRepository.loadTrendByPage.mockResolvedValue(null);
        const trend = await testInstance(fakeQuery);
        expect(trend).toBeNull();
    });
    it("should rethrow if loadTrendByPage of LoadTrendByPageRepository throws", async () => {
        loadTrendByPageRepository.loadTrendByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
