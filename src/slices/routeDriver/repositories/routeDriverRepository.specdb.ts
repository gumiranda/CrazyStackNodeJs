import {
  fakeRouteDriverEntity,
  fakeRouteDriverPaginated,
} from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RouteDriverRepository } from "./routeDriverRepository";

describe("RouteDriver Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: RouteDriverRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeRouteDriverEntity);
    repository.getOne.mockResolvedValue(fakeRouteDriverEntity);
    repository.update.mockResolvedValue(fakeRouteDriverEntity);
    repository.getPaginate.mockResolvedValue(fakeRouteDriverPaginated?.routeDrivers);
    repository.getCount.mockResolvedValue(fakeRouteDriverPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new RouteDriverRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addRouteDriver with correct values", async () => {
    await testInstance.addRouteDriver(fakeRouteDriverEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeRouteDriverEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new routeDriver created when addRouteDriver insert it", async () => {
    const result = await testInstance.addRouteDriver(fakeRouteDriverEntity);
    expect(result).toEqual(fakeRouteDriverEntity);
  });
  test("should return null when addRouteDriver returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addRouteDriver(fakeRouteDriverEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addRouteDriver throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addRouteDriver(fakeRouteDriverEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateRouteDriver throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRouteDriver(fakeQuery, fakeRouteDriverEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateRouteDriver with correct values", async () => {
    await testInstance.updateRouteDriver(fakeQuery, fakeRouteDriverEntity);
    expect(repository.update).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeRouteDriverEntity
    );
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a routeDriver updated when updateRouteDriver update it", async () => {
    const result = await testInstance.updateRouteDriver(fakeQuery, fakeRouteDriverEntity);
    expect(result).toEqual(fakeRouteDriverEntity);
  });
  test("should return a routeDriver updated when updateRouteDriver update it when i pass null", async () => {
    const result = await testInstance.updateRouteDriver(
      null as any,
      fakeRouteDriverEntity
    );
    expect(result).toEqual(fakeRouteDriverEntity);
  });
  test("should return null when updateRouteDriver returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateRouteDriver(fakeQuery, fakeRouteDriverEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateRouteDriver throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateRouteDriver(fakeQuery, fakeRouteDriverEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteRouteDriver with correct values", async () => {
    await testInstance.deleteRouteDriver(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new routeDriver created when deleteRouteDriver insert it", async () => {
    const result = await testInstance.deleteRouteDriver(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteRouteDriver returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteRouteDriver(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteRouteDriver throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteRouteDriver(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadRouteDriver with correct values", async () => {
    await testInstance.loadRouteDriver(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a routeDriver when loadRouteDriver loaded it", async () => {
    const result = await testInstance.loadRouteDriver(fakeQuery);
    expect(result).toEqual(fakeRouteDriverEntity);
  });
  test("should return null when loadRouteDriver returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRouteDriver(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadRouteDriver returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadRouteDriver(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadRouteDriver throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRouteDriver(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadRouteDriverByPage with correct values", async () => {
    await testInstance.loadRouteDriverByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadRouteDriverByPage with correct values", async () => {
    await testInstance.loadRouteDriverByPage(fakeQuery);
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
  test("should return a routeDriverByPage when loadRouteDriverByPage loaded it", async () => {
    const result = await testInstance.loadRouteDriverByPage(fakeQuery);
    expect(result).toEqual(fakeRouteDriverPaginated);
  });
  test("should return null when loadRouteDriverByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRouteDriverByPage(fakeQuery);
    expect(result).toEqual({ routeDrivers: null, total: 0 });
  });
  test("should return null when loadRouteDriverByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadRouteDriverByPage(null as any);
    expect(result).toEqual({ routeDrivers: null, total: 0 });
  });
  test("should rethrow if load of loadRouteDriverByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadRouteDriverByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
