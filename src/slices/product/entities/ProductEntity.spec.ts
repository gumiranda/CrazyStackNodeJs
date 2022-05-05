import { ProductEntity } from "./ProductEntity";
import MockDate from "mockdate";

export const fakeProductEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeProductEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: 2,
};
export const fakeProductPaginated = {
    total: 11,
    products: [
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
        fakeProductEntity,
    ],
};

describe("Product", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new ProductEntity(fakeProductEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeProductEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
