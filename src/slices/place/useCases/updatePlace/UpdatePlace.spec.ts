import { UpdatePlaceRepository } from "@/slices/place/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePlaceEntity } from "@/slices/place/entities/PlaceEntity.spec";
import { UpdatePlace, updatePlace } from "./UpdatePlace";

describe("UpdatePlace", () => {
    let fakeQuery: Query;
    let testInstance: UpdatePlace;
    let updatePlaceRepository: MockProxy<UpdatePlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updatePlaceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updatePlaceRepository.updatePlace.mockResolvedValue(fakePlaceEntity);
    });
    beforeEach(() => {
        testInstance = updatePlace(updatePlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updatePlace of UpdatePlaceRepository with correct values", async () => {
        await testInstance(fakeQuery, fakePlaceEntity);
        expect(updatePlaceRepository.updatePlace).toHaveBeenCalledWith(
            fakeQuery,
            fakePlaceEntity
        );
        expect(updatePlaceRepository.updatePlace).toHaveBeenCalledTimes(1);
    });
    it("should return a place updateed when updatePlaceRepository insert it", async () => {
        const place = await testInstance(fakeQuery, fakePlaceEntity);
        expect(place).toEqual(fakePlaceEntity);
    });
    it("should return null a new place updateed when updatePlaceRepository return it", async () => {
        updatePlaceRepository.updatePlace.mockResolvedValue(null);
        const place = await testInstance(fakeQuery, fakePlaceEntity);
        expect(place).toBeNull();
    });
    it("should rethrow if updatePlace of UpdatePlaceRepository throws", async () => {
        updatePlaceRepository.updatePlace.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakePlaceEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
