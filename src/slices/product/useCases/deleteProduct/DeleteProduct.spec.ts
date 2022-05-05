import { fakeProductEntity } from "@/slices/product/entities/ProductEntity.spec";
import { ProductEntity } from "@/slices/product/entities";
import { DeleteProductRepository } from "@/slices/product/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteProduct } from "./DeleteProduct";
import { Query } from "@/application/types";

describe("deleteProduct", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteProductRepository: MockProxy<DeleteProductRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteProductRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteProductRepository.deleteProduct.mockResolvedValue(fakeProductEntity);
    });
    beforeEach(() => {
        testInstance = deleteProduct(deleteProductRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteProduct of DeleteProductRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteProductRepository.deleteProduct).toHaveBeenCalledWith(fakeQuery);
        expect(deleteProductRepository.deleteProduct).toHaveBeenCalledTimes(1);
    });
    it("should return a new product deleted when deleteProductRepository delete it", async () => {
        const product = await testInstance(fakeQuery);
        expect(product).toEqual(fakeProductEntity);
    });
    it("should return null a new product deleted when deleteProductRepository delete it", async () => {
        deleteProductRepository.deleteProduct.mockResolvedValue(null);
        const product = await testInstance(fakeProductEntity);
        expect(product).toBeNull();
    });
    it("should rethrow if deleteProduct of DeleteProductRepository throws", async () => {
        deleteProductRepository.deleteProduct.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
