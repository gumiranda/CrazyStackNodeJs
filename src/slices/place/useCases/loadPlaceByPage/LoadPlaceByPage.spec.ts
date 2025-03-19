import { LoadPlaceByPageRepository } from "@/slices/place/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePlacePaginated } from "@/slices/place/entities/PlaceEntity.spec";
import { LoadPlaceByPage, loadPlaceByPage } from "./LoadPlaceByPage";

describe("LoadPlaceByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadPlaceByPage;
    let loadPlaceByPageRepository: MockProxy<LoadPlaceByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadPlaceByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadPlaceByPageRepository.loadPlaceByPage.mockResolvedValue(
            fakePlacePaginated
        );
    });
    beforeEach(() => {
        testInstance = loadPlaceByPage(loadPlaceByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadPlaceByPage of LoadPlaceByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadPlaceByPageRepository.loadPlaceByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadPlaceByPageRepository.loadPlaceByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a place loaded when loadPlaceByPageRepository insert it", async () => {
        const place = await testInstance(fakeQuery);
        expect(place).toEqual(fakePlacePaginated);
    });
    it("should return null a new place loaded when loadPlaceByPageRepository return it", async () => {
        loadPlaceByPageRepository.loadPlaceByPage.mockResolvedValue(null);
        const place = await testInstance(fakeQuery);
        expect(place).toBeNull();
    });
    it("should rethrow if loadPlaceByPage of LoadPlaceByPageRepository throws", async () => {
        loadPlaceByPageRepository.loadPlaceByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
