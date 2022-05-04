import { ServiceEntity } from "./ServiceEntity";
import MockDate from "mockdate";

export const fakeServiceEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeServiceEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    duration: 60,
    categoryId: "any_category_id",
    productsQuantityNeeded: 0,
    productId: "any_product_id",
    description: "desc",
    promotionalPrice: 10,
    price: 20,
    finalPrice: 0,
    havePromotionalPrice: true,
    hasFidelityGenerator: false,
    appointmentsTotal: 1,
    canPayWithFidelityPoints: false,
    comission: 99,
};
export const fakeServicePaginated = {
    total: 11,
    services: [
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
        fakeServiceEntity,
    ],
};

describe("Service", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new ServiceEntity(fakeServiceEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeServiceEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            appointmentsTotal: 0,
        });
    });
});
