import { LoadProductByPageRepository } from "@/slices/product/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeProductPaginated } from "@/slices/product/entities/ProductEntity.spec";
import { LoadProductByPage, loadProductByPage } from "./LoadProductByPage";

describe("LoadProductByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadProductByPage;
    let loadProductByPageRepository: MockProxy<LoadProductByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadProductByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadProductByPageRepository.loadProductByPage.mockResolvedValue(
            fakeProductPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadProductByPage(loadProductByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadProductByPage of LoadProductByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadProductByPageRepository.loadProductByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadProductByPageRepository.loadProductByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a product loaded when loadProductByPageRepository insert it", async () => {
        const product = await testInstance(fakeQuery);
        expect(product).toEqual(fakeProductPaginated);
    });
    it("should return null a new product loaded when loadProductByPageRepository return it", async () => {
        loadProductByPageRepository.loadProductByPage.mockResolvedValue(null);
        const product = await testInstance(fakeQuery);
        expect(product).toBeNull();
    });
    it("should rethrow if loadProductByPage of LoadProductByPageRepository throws", async () => {
        loadProductByPageRepository.loadProductByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
