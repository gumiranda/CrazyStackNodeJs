import { OrderEntity } from "./OrderEntity";
import MockDate from "mockdate";

export const fakeOrderEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeOrderEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    appointmentDate: new Date(),
    comissionPaidByOwner: true,
    comissionValue: 80.9,
    extraCost: 0,
    haveFidelity: true,
    normalCost: 80.9,
    orderPaidByClient: true,
    paymentForm: "pix",
    percentageAdopted: 80.9,
    pointsUsed: 0,
    totalValue: 93,
};
export const fakeOrderPaginated = {
    total: 11,
    orders: [
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
        fakeOrderEntity,
    ],
};

describe("Order", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new OrderEntity(fakeOrderEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeOrderEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
