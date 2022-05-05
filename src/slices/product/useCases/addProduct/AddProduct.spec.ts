import { fakeProductEntity } from "@/slices/product/entities/ProductEntity.spec";
import { ProductEntity } from "@/slices/product/entities";
import { AddProductRepository } from "@/slices/product/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addProduct } from "./AddProduct";

describe("addProduct", () => {
    let testInstance: any;
    let addProductRepository: MockProxy<AddProductRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addProductRepository = mock();
        addProductRepository.addProduct.mockResolvedValue(fakeProductEntity);
    });
    beforeEach(() => {
        testInstance = addProduct(addProductRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addProduct of AddProductRepository with correct values", async () => {
        await testInstance(fakeProductEntity);
        expect(addProductRepository.addProduct).toHaveBeenCalledWith(
            new ProductEntity(fakeProductEntity)
        );
        expect(addProductRepository.addProduct).toHaveBeenCalledTimes(1);
    });
    it("should return a new product created when addProductRepository insert it", async () => {
        const product = await testInstance(fakeProductEntity);
        expect(product).toEqual(fakeProductEntity);
    });
    it("should return null a new product created when addProductRepository insert it", async () => {
        addProductRepository.addProduct.mockResolvedValue(null);
        const product = await testInstance(fakeProductEntity);
        expect(product).toBeNull();
    });
    it("should rethrow if addProduct of AddProductRepository throws", async () => {
        addProductRepository.addProduct.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeProductEntity)).rejects.toThrowError("any_error");
    });
});
