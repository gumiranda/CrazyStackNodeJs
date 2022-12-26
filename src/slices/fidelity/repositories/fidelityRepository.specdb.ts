import {
    fakeFidelityEntity,
    fakeFidelityPaginated,
} from "@/slices/fidelity/entities/FidelityEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { FidelityData, FidelityPaginated } from "@/slices/fidelity/entities";
import {
    AddFidelityRepository,
    DeleteFidelityRepository,
    LoadFidelityByPageRepository,
    LoadFidelityRepository,
    UpdateFidelityRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { FidelityRepository } from "./fidelityRepository";

describe("Fidelity Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: FidelityRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeFidelityEntity);
        repository.getOne.mockResolvedValue(fakeFidelityEntity);
        repository.update.mockResolvedValue(fakeFidelityEntity);
        repository.getPaginate.mockResolvedValue(fakeFidelityPaginated?.fidelitys);
        repository.getCount.mockResolvedValue(fakeFidelityPaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new FidelityRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addFidelity with correct values", async () => {
        await testInstance.addFidelity(fakeFidelityEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeFidelityEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new fidelity created when addFidelity insert it", async () => {
        const result = await testInstance.addFidelity(fakeFidelityEntity);
        expect(result).toEqual(fakeFidelityEntity);
    });
    test("should return null when addFidelity returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addFidelity(fakeFidelityEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addFidelity throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addFidelity(fakeFidelityEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateFidelity throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateFidelity(fakeQuery, fakeFidelityEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateFidelity with correct values", async () => {
        await testInstance.updateFidelity(fakeQuery, fakeFidelityEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeFidelityEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a fidelity updated when updateFidelity update it", async () => {
        const result = await testInstance.updateFidelity(fakeQuery, fakeFidelityEntity);
        expect(result).toEqual(fakeFidelityEntity);
    });
    test("should return a fidelity updated when updateFidelity update it when i pass null", async () => {
        const result = await testInstance.updateFidelity(null as any, fakeFidelityEntity);
        expect(result).toEqual(fakeFidelityEntity);
    });
    test("should return null when updateFidelity returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateFidelity(fakeQuery, fakeFidelityEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateFidelity throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateFidelity(fakeQuery, fakeFidelityEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteFidelity with correct values", async () => {
        await testInstance.deleteFidelity(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new fidelity created when deleteFidelity insert it", async () => {
        const result = await testInstance.deleteFidelity(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteFidelity returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteFidelity(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteFidelity throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteFidelity(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadFidelity with correct values", async () => {
        await testInstance.loadFidelity(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a fidelity when loadFidelity loaded it", async () => {
        const result = await testInstance.loadFidelity(fakeQuery);
        expect(result).toEqual(fakeFidelityEntity);
    });
    test("should return null when loadFidelity returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadFidelity(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadFidelity returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadFidelity(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadFidelity throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadFidelity(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadFidelityByPage with correct values", async () => {
        await testInstance.loadFidelityByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadFidelityByPage with correct values", async () => {
        await testInstance.loadFidelityByPage(fakeQuery);
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
    test("should return a fidelityByPage when loadFidelityByPage loaded it", async () => {
        const result = await testInstance.loadFidelityByPage(fakeQuery);
        expect(result).toEqual(fakeFidelityPaginated);
    });
    test("should return null when loadFidelityByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadFidelityByPage(fakeQuery);
        expect(result).toEqual({ fidelitys: null, total: 0 });
    });
    test("should return null when loadFidelityByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadFidelityByPage(null as any);
        expect(result).toEqual({ fidelitys: null, total: 0 });
    });
    test("should rethrow if load of loadFidelityByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadFidelityByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
