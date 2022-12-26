import { UpdateProductRepository } from "@/slices/product/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeProductEntity } from "@/slices/product/entities/ProductEntity.spec";
import { UpdateProduct, updateProduct } from "./UpdateProduct";

describe("UpdateProduct", () => {
    let fakeQuery: Query;
    let testInstance: UpdateProduct;
    let updateProductRepository: MockProxy<UpdateProductRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateProductRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateProductRepository.updateProduct.mockResolvedValue(fakeProductEntity);
    });
    beforeEach(() => {
        testInstance = updateProduct(updateProductRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateProduct of UpdateProductRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeProductEntity);
        expect(updateProductRepository.updateProduct).toHaveBeenCalledWith(
            fakeQuery,
            fakeProductEntity
        );
        expect(updateProductRepository.updateProduct).toHaveBeenCalledTimes(1);
    });
    it("should return a product updateed when updateProductRepository insert it", async () => {
        const product = await testInstance(fakeQuery, fakeProductEntity);
        expect(product).toEqual(fakeProductEntity);
    });
    it("should return null a new product updateed when updateProductRepository return it", async () => {
        updateProductRepository.updateProduct.mockResolvedValue(null);
        const product = await testInstance(fakeQuery, fakeProductEntity);
        expect(product).toBeNull();
    });
    it("should rethrow if updateProduct of UpdateProductRepository throws", async () => {
        updateProductRepository.updateProduct.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeProductEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
