import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { OrderEntity } from "@/slices/order/entities";
import { AddOrderRepository } from "@/slices/order/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addOrder } from "./AddOrder";

describe("addOrder", () => {
    let testInstance: any;
    let addOrderRepository: MockProxy<AddOrderRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addOrderRepository = mock();
        addOrderRepository.addOrder.mockResolvedValue(fakeOrderEntity);
    });
    beforeEach(() => {
        testInstance = addOrder(addOrderRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addOrder of AddOrderRepository with correct values", async () => {
        await testInstance(fakeOrderEntity);
        expect(addOrderRepository.addOrder).toHaveBeenCalledWith(
            new OrderEntity(fakeOrderEntity)
        );
        expect(addOrderRepository.addOrder).toHaveBeenCalledTimes(1);
    });
    it("should return a new order created when addOrderRepository insert it", async () => {
        const order = await testInstance(fakeOrderEntity);
        expect(order).toEqual(fakeOrderEntity);
    });
    it("should return null a new order created when addOrderRepository insert it", async () => {
        addOrderRepository.addOrder.mockResolvedValue(null);
        const order = await testInstance(fakeOrderEntity);
        expect(order).toBeNull();
    });
    it("should rethrow if addOrder of AddOrderRepository throws", async () => {
        addOrderRepository.addOrder.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeOrderEntity)).rejects.toThrowError("any_error");
    });
});
