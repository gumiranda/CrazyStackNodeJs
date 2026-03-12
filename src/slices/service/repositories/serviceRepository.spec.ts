import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ServiceRepository } from "./serviceRepository";
import { fakeServiceEntity, fakeServicePaginated } from "@/slices/service/entities/ServiceEntity.spec";

describe("ServiceRepository", () => {
  let fakeQuery: Query;
  let testInstance: ServiceRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    repository = mock<Repository>();
    fakeQuery = { fields: { name: "123" }, options: {} };
    repository.add.mockResolvedValue(fakeServiceEntity);
    repository.getOne.mockResolvedValue(fakeServiceEntity);
    repository.update.mockResolvedValue(fakeServiceEntity);
    repository.getPaginate.mockResolvedValue(fakeServicePaginated?.services);
    repository.getCount.mockResolvedValue(fakeServicePaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
    repository.increment.mockResolvedValue(fakeServiceEntity);
  });
  beforeEach(() => { testInstance = new ServiceRepository(repository); });
  afterAll(() => { MockDate.reset(); });
  test("should call add of addService with correct values", async () => {
    await testInstance.addService(fakeServiceEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeServiceEntity);
  });
  test("should return a new service", async () => {
    expect(await testInstance.addService(fakeServiceEntity)).toEqual(fakeServiceEntity);
  });
  test("should return null when addService returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    expect(await testInstance.addService(fakeServiceEntity)).toBeNull();
  });
  test("should rethrow if addService throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.addService(fakeServiceEntity)).rejects.toThrow("Error");
  });
  test("should call deleteOne with correct values", async () => {
    await testInstance.deleteService(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return null when deleteService returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    expect(await testInstance.deleteService(fakeQuery)).toBeNull();
  });
  test("should rethrow if deleteService throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.deleteService(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getOne of loadService with correct values", async () => {
    await testInstance.loadService(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
  });
  test("should return service when loadService loads it", async () => {
    expect(await testInstance.loadService(fakeQuery)).toEqual(fakeServiceEntity);
  });
  test("should return null when loadService returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    expect(await testInstance.loadService(fakeQuery)).toBeNull();
  });
  test("should rethrow if loadService throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadService(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getPaginate of loadServiceByPage with correct values", async () => {
    await testInstance.loadServiceByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, fakeQuery?.fields, { createdAt: -1 }, 10, {});
  });
  test("should return paginated services", async () => {
    expect(await testInstance.loadServiceByPage(fakeQuery)).toEqual(fakeServicePaginated);
  });
  test("should return null when loadServiceByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    expect(await testInstance.loadServiceByPage(fakeQuery)).toEqual({ services: null, total: 0 });
  });
  test("should rethrow if loadServiceByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadServiceByPage(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call update of updateService with correct values", async () => {
    await testInstance.updateService(fakeQuery, fakeServiceEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeServiceEntity);
  });
  test("should return updated service", async () => {
    expect(await testInstance.updateService(fakeQuery, fakeServiceEntity)).toEqual(fakeServiceEntity);
  });
  test("should return null when updateService returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    expect(await testInstance.updateService(fakeQuery, fakeServiceEntity)).toBeNull();
  });
  test("should rethrow if updateService throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.updateService(fakeQuery, fakeServiceEntity)).rejects.toThrow("Error");
  });
  test("should call increment of incrementAppointmentsTotal with correct values", async () => {
    await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(repository.increment).toHaveBeenCalledWith(fakeQuery?.fields, { appointmentsTotal: 1 });
  });
  test("should return service after increment", async () => {
    expect(await testInstance.incrementAppointmentsTotal(fakeQuery)).toEqual(fakeServiceEntity);
  });
  test("should rethrow if incrementAppointmentsTotal throws", async () => {
    repository.increment.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.incrementAppointmentsTotal(fakeQuery)).rejects.toThrow("Error");
  });
});
