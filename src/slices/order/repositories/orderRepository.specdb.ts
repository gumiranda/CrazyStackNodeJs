import {
    fakeOrderEntity,
    fakeOrderPaginated,
} from "@/slices/order/entities/OrderEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { OrderData, OrderPaginated } from "@/slices/order/entities";
import {
    AddOrderRepository,
    DeleteOrderRepository,
    LoadOrderByPageRepository,
    LoadOrderRepository,
    UpdateOrderRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { OrderRepository } from "./orderRepository";

describe("Order Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: OrderRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeOrderEntity);
        repository.getOne.mockResolvedValue(fakeOrderEntity);
        repository.update.mockResolvedValue(fakeOrderEntity);
        repository.getPaginate.mockResolvedValue(fakeOrderPaginated?.orders);
        repository.getCount.mockResolvedValue(fakeOrderPaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new OrderRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addOrder with correct values", async () => {
        await testInstance.addOrder(fakeOrderEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeOrderEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new order created when addOrder insert it", async () => {
        const result = await testInstance.addOrder(fakeOrderEntity);
        expect(result).toEqual(fakeOrderEntity);
    });
    test("should return null when addOrder returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addOrder(fakeOrderEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addOrder throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addOrder(fakeOrderEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateOrder throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateOrder(fakeQuery, fakeOrderEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateOrder with correct values", async () => {
        await testInstance.updateOrder(fakeQuery, fakeOrderEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeOrderEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a order updated when updateOrder update it", async () => {
        const result = await testInstance.updateOrder(fakeQuery, fakeOrderEntity);
        expect(result).toEqual(fakeOrderEntity);
    });
    test("should return a order updated when updateOrder update it when i pass null", async () => {
        const result = await testInstance.updateOrder(null as any, fakeOrderEntity);
        expect(result).toEqual(fakeOrderEntity);
    });
    test("should return null when updateOrder returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateOrder(fakeQuery, fakeOrderEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateOrder throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateOrder(fakeQuery, fakeOrderEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteOrder with correct values", async () => {
        await testInstance.deleteOrder(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new order created when deleteOrder insert it", async () => {
        const result = await testInstance.deleteOrder(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteOrder returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteOrder(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteOrder throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteOrder(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadOrder with correct values", async () => {
        await testInstance.loadOrder(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a order when loadOrder loaded it", async () => {
        const result = await testInstance.loadOrder(fakeQuery);
        expect(result).toEqual(fakeOrderEntity);
    });
    test("should return null when loadOrder returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadOrder(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadOrder returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadOrder(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadOrder throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadOrder(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadOrderByPage with correct values", async () => {
        await testInstance.loadOrderByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadOrderByPage with correct values", async () => {
        await testInstance.loadOrderByPage(fakeQuery);
        expect(repository.getPaginate).toHaveBeenCalledWith(
            0,
            fakeQuery?.fields,
            {
                createdAt: -1,
            },
            10,
            {}
        );
        expect(repository.getPaginate).toHaveBeenCalledTimes(1);
    });
    test("should return a orderByPage when loadOrderByPage loaded it", async () => {
        const result = await testInstance.loadOrderByPage(fakeQuery);
        expect(result).toEqual(fakeOrderPaginated);
    });
    test("should return null when loadOrderByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadOrderByPage(fakeQuery);
        expect(result).toEqual({ orders: null, total: 0 });
    });
    test("should return null when loadOrderByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadOrderByPage(null as any);
        expect(result).toEqual({ orders: null, total: 0 });
    });
    test("should rethrow if load of loadOrderByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadOrderByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
