import { fakePlaceEntity } from "@/slices/place/entities/PlaceEntity.spec";
import { PlaceEntity } from "@/slices/place/entities";
import { AddPlaceRepository } from "@/slices/place/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addPlace } from "./AddPlace";

describe("addPlace", () => {
    let testInstance: any;
    let addPlaceRepository: MockProxy<AddPlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addPlaceRepository = mock();
        addPlaceRepository.addPlace.mockResolvedValue(fakePlaceEntity);
    });
    beforeEach(() => {
        testInstance = addPlace(addPlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addPlace of AddPlaceRepository with correct values", async () => {
        await testInstance(fakePlaceEntity);
        expect(addPlaceRepository.addPlace).toHaveBeenCalledWith(
            new PlaceEntity(fakePlaceEntity)
        );
        expect(addPlaceRepository.addPlace).toHaveBeenCalledTimes(1);
    });
    it("should return a new place created when addPlaceRepository insert it", async () => {
        const place = await testInstance(fakePlaceEntity);
        expect(place).toEqual(fakePlaceEntity);
    });
    it("should return null a new place created when addPlaceRepository insert it", async () => {
        addPlaceRepository.addPlace.mockResolvedValue(null);
        const place = await testInstance(fakePlaceEntity);
        expect(place).toBeNull();
    });
    it("should rethrow if addPlace of AddPlaceRepository throws", async () => {
        addPlaceRepository.addPlace.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakePlaceEntity)).rejects.toThrowError("any_error");
    });
});
