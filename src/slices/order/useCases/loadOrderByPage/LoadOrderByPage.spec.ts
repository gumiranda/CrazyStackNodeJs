import { LoadOrderByPageRepository } from "@/slices/order/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeOrderPaginated } from "@/slices/order/entities/OrderEntity.spec";
import { LoadOrderByPage, loadOrderByPage } from "./LoadOrderByPage";

describe("LoadOrderByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadOrderByPage;
    let loadOrderByPageRepository: MockProxy<LoadOrderByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadOrderByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadOrderByPageRepository.loadOrderByPage.mockResolvedValue(
            fakeOrderPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadOrderByPage(loadOrderByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadOrderByPage of LoadOrderByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadOrderByPageRepository.loadOrderByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadOrderByPageRepository.loadOrderByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a order loaded when loadOrderByPageRepository insert it", async () => {
        const order = await testInstance(fakeQuery);
        expect(order).toEqual(fakeOrderPaginated);
    });
    it("should return null a new order loaded when loadOrderByPageRepository return it", async () => {
        loadOrderByPageRepository.loadOrderByPage.mockResolvedValue(null);
        const order = await testInstance(fakeQuery);
        expect(order).toBeNull();
    });
    it("should rethrow if loadOrderByPage of LoadOrderByPageRepository throws", async () => {
        loadOrderByPageRepository.loadOrderByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
