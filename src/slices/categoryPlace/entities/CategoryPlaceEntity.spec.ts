import { CategoryPlaceEntity } from "./CategoryPlaceEntity";
import MockDate from "mockdate";

export const fakeCategoryPlaceEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeCategoryPlaceEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const fakeCategoryPlacePaginated = {
    total: 11,
    categoryPlaces: [
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
        fakeCategoryPlaceEntity,
    ],
};

describe("CategoryPlace", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new CategoryPlaceEntity(fakeCategoryPlaceEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeCategoryPlaceEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
