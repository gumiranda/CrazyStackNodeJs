import { LoadPlaceRepository } from "@/slices/place/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePlaceEntity } from "@/slices/place/entities/PlaceEntity.spec";
import { LoadPlace, loadPlace } from "./LoadPlace";

describe("LoadPlace", () => {
    let fakeQuery: Query;
    let testInstance: LoadPlace;
    let loadPlaceRepository: MockProxy<LoadPlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadPlaceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadPlaceRepository.loadPlace.mockResolvedValue(fakePlaceEntity);
    });
    beforeEach(() => {
        testInstance = loadPlace(loadPlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadPlace of LoadPlaceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadPlaceRepository.loadPlace).toHaveBeenCalledWith(fakeQuery);
        expect(loadPlaceRepository.loadPlace).toHaveBeenCalledTimes(1);
    });
    it("should return a place loaded when loadPlaceRepository insert it", async () => {
        const place = await testInstance(fakeQuery);
        expect(place).toEqual(fakePlaceEntity);
    });
    it("should return null a new place loaded when loadPlaceRepository return it", async () => {
        loadPlaceRepository.loadPlace.mockResolvedValue(null);
        const place = await testInstance(fakeQuery);
        expect(place).toBeNull();
    });
    it("should rethrow if loadPlace of LoadPlaceRepository throws", async () => {
        loadPlaceRepository.loadPlace.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
