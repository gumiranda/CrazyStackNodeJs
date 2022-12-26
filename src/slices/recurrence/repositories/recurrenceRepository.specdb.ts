import {
    fakeRecurrenceEntity,
    fakeRecurrencePaginated,
} from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { RecurrenceData, RecurrencePaginated } from "@/slices/recurrence/entities";
import {
    AddRecurrenceRepository,
    DeleteRecurrenceRepository,
    LoadRecurrenceByPageRepository,
    LoadRecurrenceRepository,
    UpdateRecurrenceRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RecurrenceRepository } from "./recurrenceRepository";

describe("Recurrence Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: RecurrenceRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeRecurrenceEntity);
        repository.getOne.mockResolvedValue(fakeRecurrenceEntity);
        repository.update.mockResolvedValue(fakeRecurrenceEntity);
        repository.getPaginate.mockResolvedValue(fakeRecurrencePaginated?.recurrences);
        repository.getCount.mockResolvedValue(fakeRecurrencePaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new RecurrenceRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addRecurrence with correct values", async () => {
        await testInstance.addRecurrence(fakeRecurrenceEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeRecurrenceEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new recurrence created when addRecurrence insert it", async () => {
        const result = await testInstance.addRecurrence(fakeRecurrenceEntity);
        expect(result).toEqual(fakeRecurrenceEntity);
    });
    test("should return null when addRecurrence returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addRecurrence(fakeRecurrenceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addRecurrence throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addRecurrence(fakeRecurrenceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateRecurrence throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateRecurrence(fakeQuery, fakeRecurrenceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateRecurrence with correct values", async () => {
        await testInstance.updateRecurrence(fakeQuery, fakeRecurrenceEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeRecurrenceEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a recurrence updated when updateRecurrence update it", async () => {
        const result = await testInstance.updateRecurrence(fakeQuery, fakeRecurrenceEntity);
        expect(result).toEqual(fakeRecurrenceEntity);
    });
    test("should return a recurrence updated when updateRecurrence update it when i pass null", async () => {
        const result = await testInstance.updateRecurrence(null as any, fakeRecurrenceEntity);
        expect(result).toEqual(fakeRecurrenceEntity);
    });
    test("should return null when updateRecurrence returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateRecurrence(fakeQuery, fakeRecurrenceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateRecurrence throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateRecurrence(fakeQuery, fakeRecurrenceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteRecurrence with correct values", async () => {
        await testInstance.deleteRecurrence(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new recurrence created when deleteRecurrence insert it", async () => {
        const result = await testInstance.deleteRecurrence(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteRecurrence returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteRecurrence(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteRecurrence throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteRecurrence(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadRecurrence with correct values", async () => {
        await testInstance.loadRecurrence(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a recurrence when loadRecurrence loaded it", async () => {
        const result = await testInstance.loadRecurrence(fakeQuery);
        expect(result).toEqual(fakeRecurrenceEntity);
    });
    test("should return null when loadRecurrence returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadRecurrence(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadRecurrence returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadRecurrence(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadRecurrence throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadRecurrence(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadRecurrenceByPage with correct values", async () => {
        await testInstance.loadRecurrenceByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadRecurrenceByPage with correct values", async () => {
        await testInstance.loadRecurrenceByPage(fakeQuery);
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
    test("should return a recurrenceByPage when loadRecurrenceByPage loaded it", async () => {
        const result = await testInstance.loadRecurrenceByPage(fakeQuery);
        expect(result).toEqual(fakeRecurrencePaginated);
    });
    test("should return null when loadRecurrenceByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadRecurrenceByPage(fakeQuery);
        expect(result).toEqual({ recurrences: null, total: 0 });
    });
    test("should return null when loadRecurrenceByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadRecurrenceByPage(null as any);
        expect(result).toEqual({ recurrences: null, total: 0 });
    });
    test("should rethrow if load of loadRecurrenceByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadRecurrenceByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
