import {
  fakeMapRouteEntity,
  fakeMapRoutePaginated,
} from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { MapRouteRepository } from "./mapRouteRepository";

describe("MapRoute Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: MapRouteRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeMapRouteEntity);
    repository.getOne.mockResolvedValue(fakeMapRouteEntity);
    repository.update.mockResolvedValue(fakeMapRouteEntity);
    repository.getPaginate.mockResolvedValue(fakeMapRoutePaginated?.mapRoutes);
    repository.getCount.mockResolvedValue(fakeMapRoutePaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new MapRouteRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addMapRoute with correct values", async () => {
    await testInstance.addMapRoute(fakeMapRouteEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeMapRouteEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new mapRoute created when addMapRoute insert it", async () => {
    const result = await testInstance.addMapRoute(fakeMapRouteEntity);
    expect(result).toEqual(fakeMapRouteEntity);
  });
  test("should return null when addMapRoute returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addMapRoute(fakeMapRouteEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addMapRoute throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addMapRoute(fakeMapRouteEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateMapRoute throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateMapRoute(fakeQuery, fakeMapRouteEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateMapRoute with correct values", async () => {
    await testInstance.updateMapRoute(fakeQuery, fakeMapRouteEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeMapRouteEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a mapRoute updated when updateMapRoute update it", async () => {
    const result = await testInstance.updateMapRoute(fakeQuery, fakeMapRouteEntity);
    expect(result).toEqual(fakeMapRouteEntity);
  });
  test("should return a mapRoute updated when updateMapRoute update it when i pass null", async () => {
    const result = await testInstance.updateMapRoute(null as any, fakeMapRouteEntity);
    expect(result).toEqual(fakeMapRouteEntity);
  });
  test("should return null when updateMapRoute returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateMapRoute(fakeQuery, fakeMapRouteEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateMapRoute throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateMapRoute(fakeQuery, fakeMapRouteEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteMapRoute with correct values", async () => {
    await testInstance.deleteMapRoute(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new mapRoute created when deleteMapRoute insert it", async () => {
    const result = await testInstance.deleteMapRoute(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteMapRoute returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteMapRoute(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteMapRoute throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteMapRoute(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadMapRoute with correct values", async () => {
    await testInstance.loadMapRoute(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a mapRoute when loadMapRoute loaded it", async () => {
    const result = await testInstance.loadMapRoute(fakeQuery);
    expect(result).toEqual(fakeMapRouteEntity);
  });
  test("should return null when loadMapRoute returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadMapRoute(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadMapRoute returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadMapRoute(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadMapRoute throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadMapRoute(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadMapRouteByPage with correct values", async () => {
    await testInstance.loadMapRouteByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadMapRouteByPage with correct values", async () => {
    await testInstance.loadMapRouteByPage(fakeQuery);
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
  test("should return a mapRouteByPage when loadMapRouteByPage loaded it", async () => {
    const result = await testInstance.loadMapRouteByPage(fakeQuery);
    expect(result).toEqual(fakeMapRoutePaginated);
  });
  test("should return null when loadMapRouteByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadMapRouteByPage(fakeQuery);
    expect(result).toEqual({ mapRoutes: null, total: 0 });
  });
  test("should return null when loadMapRouteByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadMapRouteByPage(null as any);
    expect(result).toEqual({ mapRoutes: null, total: 0 });
  });
  test("should rethrow if load of loadMapRouteByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadMapRouteByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
