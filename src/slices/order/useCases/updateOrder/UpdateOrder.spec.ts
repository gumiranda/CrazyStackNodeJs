import { UpdateOrderRepository } from "@/slices/order/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { UpdateOrder, updateOrder } from "./UpdateOrder";

describe("UpdateOrder", () => {
    let fakeQuery: Query;
    let testInstance: UpdateOrder;
    let updateOrderRepository: MockProxy<UpdateOrderRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateOrderRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateOrderRepository.updateOrder.mockResolvedValue(fakeOrderEntity);
    });
    beforeEach(() => {
        testInstance = updateOrder(updateOrderRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateOrder of UpdateOrderRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeOrderEntity);
        expect(updateOrderRepository.updateOrder).toHaveBeenCalledWith(
            fakeQuery,
            fakeOrderEntity
        );
        expect(updateOrderRepository.updateOrder).toHaveBeenCalledTimes(1);
    });
    it("should return a order updateed when updateOrderRepository insert it", async () => {
        const order = await testInstance(fakeQuery, fakeOrderEntity);
        expect(order).toEqual(fakeOrderEntity);
    });
    it("should return null a new order updateed when updateOrderRepository return it", async () => {
        updateOrderRepository.updateOrder.mockResolvedValue(null);
        const order = await testInstance(fakeQuery, fakeOrderEntity);
        expect(order).toBeNull();
    });
    it("should rethrow if updateOrder of UpdateOrderRepository throws", async () => {
        updateOrderRepository.updateOrder.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeOrderEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
