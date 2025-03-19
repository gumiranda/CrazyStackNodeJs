import { fakePlaceEntity } from "@/slices/place/entities/PlaceEntity.spec";
import { PlaceEntity } from "@/slices/place/entities";
import { DeletePlaceRepository } from "@/slices/place/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deletePlace } from "./DeletePlace";
import { Query } from "@/application/types";

describe("deletePlace", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deletePlaceRepository: MockProxy<DeletePlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deletePlaceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deletePlaceRepository.deletePlace.mockResolvedValue(fakePlaceEntity);
    });
    beforeEach(() => {
        testInstance = deletePlace(deletePlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deletePlace of DeletePlaceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deletePlaceRepository.deletePlace).toHaveBeenCalledWith(fakeQuery);
        expect(deletePlaceRepository.deletePlace).toHaveBeenCalledTimes(1);
    });
    it("should return a new place deleted when deletePlaceRepository delete it", async () => {
        const place = await testInstance(fakeQuery);
        expect(place).toEqual(fakePlaceEntity);
    });
    it("should return null a new place deleted when deletePlaceRepository delete it", async () => {
        deletePlaceRepository.deletePlace.mockResolvedValue(null);
        const place = await testInstance(fakePlaceEntity);
        expect(place).toBeNull();
    });
    it("should rethrow if deletePlace of DeletePlaceRepository throws", async () => {
        deletePlaceRepository.deletePlace.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
