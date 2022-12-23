import {
  fakeProductEntity,
  fakeProductPaginated,
} from "@/slices/product/entities/ProductEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { ProductData, ProductPaginated } from "@/slices/product/entities";
import {
  AddProductRepository,
  DeleteProductRepository,
  LoadProductByPageRepository,
  LoadProductRepository,
  UpdateProductRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ProductRepository } from "./productRepository";

describe("Product Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: ProductRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeProductEntity);
    repository.getOne.mockResolvedValue(fakeProductEntity);
    repository.update.mockResolvedValue(fakeProductEntity);
    repository.getPaginate.mockResolvedValue(fakeProductPaginated?.products);
    repository.getCount.mockResolvedValue(fakeProductPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new ProductRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addProduct with correct values", async () => {
    await testInstance.addProduct(fakeProductEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeProductEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new product created when addProduct insert it", async () => {
    const result = await testInstance.addProduct(fakeProductEntity);
    expect(result).toEqual(fakeProductEntity);
  });
  test("should return null when addProduct returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addProduct(fakeProductEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addProduct throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addProduct(fakeProductEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateProduct throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateProduct(fakeQuery, fakeProductEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateProduct with correct values", async () => {
    await testInstance.updateProduct(fakeQuery, fakeProductEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeProductEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a product updated when updateProduct update it", async () => {
    const result = await testInstance.updateProduct(fakeQuery, fakeProductEntity);
    expect(result).toEqual(fakeProductEntity);
  });
  test("should return a product updated when updateProduct update it when i pass null", async () => {
    const result = await testInstance.updateProduct(null as any, fakeProductEntity);
    expect(result).toEqual(fakeProductEntity);
  });
  test("should return null when updateProduct returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateProduct(fakeQuery, fakeProductEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateProduct throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateProduct(fakeQuery, fakeProductEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteProduct with correct values", async () => {
    await testInstance.deleteProduct(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new product created when deleteProduct insert it", async () => {
    const result = await testInstance.deleteProduct(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteProduct returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteProduct(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteProduct throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteProduct(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadProduct with correct values", async () => {
    await testInstance.loadProduct(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a product when loadProduct loaded it", async () => {
    const result = await testInstance.loadProduct(fakeQuery);
    expect(result).toEqual(fakeProductEntity);
  });
  test("should return null when loadProduct returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadProduct(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadProduct returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadProduct(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadProduct throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadProduct(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadProductByPage with correct values", async () => {
    await testInstance.loadProductByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadProductByPage with correct values", async () => {
    await testInstance.loadProductByPage(fakeQuery);
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
  test("should return a productByPage when loadProductByPage loaded it", async () => {
    const result = await testInstance.loadProductByPage(fakeQuery);
    expect(result).toEqual(fakeProductPaginated);
  });
  test("should return null when loadProductByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadProductByPage(fakeQuery);
    expect(result).toEqual({ products: null, total: 0 });
  });
  test("should return null when loadProductByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadProductByPage(null as any);
    expect(result).toEqual({ products: null, total: 0 });
  });
  test("should rethrow if load of loadProductByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadProductByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
