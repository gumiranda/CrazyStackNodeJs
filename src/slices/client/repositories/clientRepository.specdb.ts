import {
  fakeClientEntity,
  fakeClientPaginated,
} from "@/slices/client/entities/ClientEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { ClientData, ClientPaginated } from "@/slices/client/entities";
import {
  AddClientRepository,
  DeleteClientRepository,
  LoadClientByPageRepository,
  LoadClientRepository,
  UpdateClientRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ClientRepository } from "./clientRepository";

describe("Client Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: ClientRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeClientEntity);
    repository.getOne.mockResolvedValue(fakeClientEntity);
    repository.update.mockResolvedValue(fakeClientEntity);
    repository.increment.mockResolvedValue(fakeClientEntity);
    repository.getPaginate.mockResolvedValue(fakeClientPaginated?.clients);
    repository.getCount.mockResolvedValue(fakeClientPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new ClientRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addClient with correct values", async () => {
    await testInstance.addClient(fakeClientEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeClientEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new client created when addClient insert it", async () => {
    const result = await testInstance.addClient(fakeClientEntity);
    expect(result).toEqual(fakeClientEntity);
  });
  test("should return null when addClient returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addClient(fakeClientEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addClient throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addClient(fakeClientEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateClient throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateClient(fakeQuery, fakeClientEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateClient with correct values", async () => {
    await testInstance.updateClient(fakeQuery, fakeClientEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeClientEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a client updated when updateClient update it", async () => {
    const result = await testInstance.updateClient(fakeQuery, fakeClientEntity);
    expect(result).toEqual(fakeClientEntity);
  });
  test("should return a client updated when updateClient update it when i pass null", async () => {
    const result = await testInstance.updateClient(null as any, fakeClientEntity);
    expect(result).toEqual(fakeClientEntity);
  });
  test("should return null when updateClient returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateClient(fakeQuery, fakeClientEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateClient throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateClient(fakeQuery, fakeClientEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if increment of incrementClient throws", async () => {
    repository.increment.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.incrementAppointmentsTotal(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call increment of incrementAppointmentsTotal with correct values", async () => {
    await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(repository.increment).toHaveBeenCalledWith(fakeQuery?.fields, {
      appointmentsTotal: 1,
    });
    expect(repository.increment).toHaveBeenCalledTimes(1);
  });
  test("should return a client incrementd when incrementAppointmentsTotal increment it", async () => {
    const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(result).toEqual(fakeClientEntity);
  });
  test("should return a client incrementd when incrementAppointmentsTotal increment it when i pass null", async () => {
    const result = await testInstance.incrementAppointmentsTotal(null as any);
    expect(result).toEqual(fakeClientEntity);
  });
  test("should return null when incrementAppointmentsTotal returns null", async () => {
    repository.increment.mockResolvedValueOnce(null);
    const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if increment of incrementAppointmentsTotal throws", async () => {
    repository.increment.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.incrementAppointmentsTotal(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteClient with correct values", async () => {
    await testInstance.deleteClient(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new client created when deleteClient insert it", async () => {
    const result = await testInstance.deleteClient(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteClient returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteClient(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteClient throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteClient(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadClient with correct values", async () => {
    await testInstance.loadClient(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a client when loadClient loaded it", async () => {
    const result = await testInstance.loadClient(fakeQuery);
    expect(result).toEqual(fakeClientEntity);
  });
  test("should return null when loadClient returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadClient(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadClient returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadClient(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadClient throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadClient(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadClientByPage with correct values", async () => {
    await testInstance.loadClientByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadClientByPage with correct values", async () => {
    await testInstance.loadClientByPage(fakeQuery);
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
  test("should return a clientByPage when loadClientByPage loaded it", async () => {
    const result = await testInstance.loadClientByPage(fakeQuery);
    expect(result).toEqual(fakeClientPaginated);
  });
  test("should return null when loadClientByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadClientByPage(fakeQuery);
    expect(result).toEqual({ clients: null, total: 0 });
  });
  test("should return null when loadClientByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadClientByPage(null as any);
    expect(result).toEqual({ clients: null, total: 0 });
  });
  test("should rethrow if load of loadClientByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadClientByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
