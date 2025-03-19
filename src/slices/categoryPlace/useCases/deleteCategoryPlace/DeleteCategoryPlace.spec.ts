import { fakeCategoryPlaceEntity } from "@/slices/categoryPlace/entities/CategoryPlaceEntity.spec";
import { CategoryPlaceEntity } from "@/slices/categoryPlace/entities";
import { DeleteCategoryPlaceRepository } from "@/slices/categoryPlace/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteCategoryPlace } from "./DeleteCategoryPlace";
import { Query } from "@/application/types";

describe("deleteCategoryPlace", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteCategoryPlaceRepository: MockProxy<DeleteCategoryPlaceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteCategoryPlaceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteCategoryPlaceRepository.deleteCategoryPlace.mockResolvedValue(fakeCategoryPlaceEntity);
    });
    beforeEach(() => {
        testInstance = deleteCategoryPlace(deleteCategoryPlaceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteCategoryPlace of DeleteCategoryPlaceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteCategoryPlaceRepository.deleteCategoryPlace).toHaveBeenCalledWith(fakeQuery);
        expect(deleteCategoryPlaceRepository.deleteCategoryPlace).toHaveBeenCalledTimes(1);
    });
    it("should return a new categoryPlace deleted when deleteCategoryPlaceRepository delete it", async () => {
        const categoryPlace = await testInstance(fakeQuery);
        expect(categoryPlace).toEqual(fakeCategoryPlaceEntity);
    });
    it("should return null a new categoryPlace deleted when deleteCategoryPlaceRepository delete it", async () => {
        deleteCategoryPlaceRepository.deleteCategoryPlace.mockResolvedValue(null);
        const categoryPlace = await testInstance(fakeCategoryPlaceEntity);
        expect(categoryPlace).toBeNull();
    });
    it("should rethrow if deleteCategoryPlace of DeleteCategoryPlaceRepository throws", async () => {
        deleteCategoryPlaceRepository.deleteCategoryPlace.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
