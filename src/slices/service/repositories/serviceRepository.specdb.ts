import {
    fakeServiceEntity,
    fakeServicePaginated,
} from "@/slices/service/entities/ServiceEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { ServiceData, ServicePaginated } from "@/slices/service/entities";
import {
    AddServiceRepository,
    DeleteServiceRepository,
    LoadServiceByPageRepository,
    LoadServiceRepository,
    UpdateServiceRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ServiceRepository } from "./serviceRepository";

describe("Service Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: ServiceRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeServiceEntity);
        repository.getOne.mockResolvedValue(fakeServiceEntity);
        repository.update.mockResolvedValue(fakeServiceEntity);
        repository.getPaginate.mockResolvedValue(fakeServicePaginated?.services);
        repository.getCount.mockResolvedValue(fakeServicePaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
        repository.increment.mockResolvedValue(fakeServiceEntity);
    });
    beforeEach(async () => {
        testInstance = new ServiceRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addService with correct values", async () => {
        await testInstance.addService(fakeServiceEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeServiceEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new service created when addService insert it", async () => {
        const result = await testInstance.addService(fakeServiceEntity);
        expect(result).toEqual(fakeServiceEntity);
    });
    test("should return null when addService returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addService(fakeServiceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addService throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addService(fakeServiceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateService throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateService(fakeQuery, fakeServiceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateService with correct values", async () => {
        await testInstance.updateService(fakeQuery, fakeServiceEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeServiceEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a service updated when updateService update it", async () => {
        const result = await testInstance.updateService(fakeQuery, fakeServiceEntity);
        expect(result).toEqual(fakeServiceEntity);
    });
    test("should return a service updated when updateService update it when i pass null", async () => {
        const result = await testInstance.updateService(null as any, fakeServiceEntity);
        expect(result).toEqual(fakeServiceEntity);
    });
    test("should return null when updateService returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateService(fakeQuery, fakeServiceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateService throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateService(fakeQuery, fakeServiceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteService with correct values", async () => {
        await testInstance.deleteService(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new service created when deleteService insert it", async () => {
        const result = await testInstance.deleteService(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteService returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteService(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteService throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteService(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadService with correct values", async () => {
        await testInstance.loadService(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a service when loadService loaded it", async () => {
        const result = await testInstance.loadService(fakeQuery);
        expect(result).toEqual(fakeServiceEntity);
    });
    test("should return null when loadService returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadService(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadService returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadService(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadService throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadService(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadServiceByPage with correct values", async () => {
        await testInstance.loadServiceByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadServiceByPage with correct values", async () => {
        await testInstance.loadServiceByPage(fakeQuery);
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
    test("should return a serviceByPage when loadServiceByPage loaded it", async () => {
        const result = await testInstance.loadServiceByPage(fakeQuery);
        expect(result).toEqual(fakeServicePaginated);
    });
    test("should return null when loadServiceByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadServiceByPage(fakeQuery);
        expect(result).toEqual({ services: null, total: 0 });
    });
    test("should return null when loadServiceByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadServiceByPage(null as any);
        expect(result).toEqual({ services: null, total: 0 });
    });
    test("should rethrow if load of loadServiceByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadServiceByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if increment of incrementService throws", async () => {
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
    test("should return a service incrementd when incrementAppointmentsTotal increment it", async () => {
        const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
        expect(result).toEqual(fakeServiceEntity);
    });
    test("should return a service incrementd when incrementAppointmentsTotal increment it when i pass null", async () => {
        const result = await testInstance.incrementAppointmentsTotal(null as any);
        expect(result).toEqual(fakeServiceEntity);
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
});
