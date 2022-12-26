import { LoadOrderRepository } from "@/slices/order/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { LoadOrder, loadOrder } from "./LoadOrder";

describe("LoadOrder", () => {
    let fakeQuery: Query;
    let testInstance: LoadOrder;
    let loadOrderRepository: MockProxy<LoadOrderRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadOrderRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadOrderRepository.loadOrder.mockResolvedValue(fakeOrderEntity);
    });
    beforeEach(() => {
        testInstance = loadOrder(loadOrderRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadOrder of LoadOrderRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadOrderRepository.loadOrder).toHaveBeenCalledWith(fakeQuery);
        expect(loadOrderRepository.loadOrder).toHaveBeenCalledTimes(1);
    });
    it("should return a order loaded when loadOrderRepository insert it", async () => {
        const order = await testInstance(fakeQuery);
        expect(order).toEqual(fakeOrderEntity);
    });
    it("should return null a new order loaded when loadOrderRepository return it", async () => {
        loadOrderRepository.loadOrder.mockResolvedValue(null);
        const order = await testInstance(fakeQuery);
        expect(order).toBeNull();
    });
    it("should rethrow if loadOrder of LoadOrderRepository throws", async () => {
        loadOrderRepository.loadOrder.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
