import {
    fakeAppointmentEntity,
    fakeAppointmentPaginated,
} from "@/slices/appointment/entities/AppointmentEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { AppointmentData, AppointmentPaginated } from "@/slices/appointment/entities";
import {
    AddAppointmentRepository,
    DeleteAppointmentRepository,
    LoadAppointmentByPageRepository,
    LoadAppointmentRepository,
    UpdateAppointmentRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { AppointmentRepository } from "./appointmentRepository";

describe("Appointment Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: AppointmentRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeAppointmentEntity);
        repository.getOne.mockResolvedValue(fakeAppointmentEntity);
        repository.update.mockResolvedValue(fakeAppointmentEntity);
        repository.getPaginate.mockResolvedValue(fakeAppointmentPaginated?.appointments);
        repository.getCount.mockResolvedValue(fakeAppointmentPaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new AppointmentRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addAppointment with correct values", async () => {
        await testInstance.addAppointment(fakeAppointmentEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeAppointmentEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new appointment created when addAppointment insert it", async () => {
        const result = await testInstance.addAppointment(fakeAppointmentEntity);
        expect(result).toEqual(fakeAppointmentEntity);
    });
    test("should return null when addAppointment returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addAppointment(fakeAppointmentEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addAppointment throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addAppointment(fakeAppointmentEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateAppointment throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateAppointment with correct values", async () => {
        await testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeAppointmentEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a appointment updated when updateAppointment update it", async () => {
        const result = await testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
        expect(result).toEqual(fakeAppointmentEntity);
    });
    test("should return a appointment updated when updateAppointment update it when i pass null", async () => {
        const result = await testInstance.updateAppointment(null as any, fakeAppointmentEntity);
        expect(result).toEqual(fakeAppointmentEntity);
    });
    test("should return null when updateAppointment returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateAppointment throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateAppointment(fakeQuery, fakeAppointmentEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteAppointment with correct values", async () => {
        await testInstance.deleteAppointment(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new appointment created when deleteAppointment insert it", async () => {
        const result = await testInstance.deleteAppointment(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteAppointment returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteAppointment(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteAppointment throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteAppointment(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadAppointment with correct values", async () => {
        await testInstance.loadAppointment(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a appointment when loadAppointment loaded it", async () => {
        const result = await testInstance.loadAppointment(fakeQuery);
        expect(result).toEqual(fakeAppointmentEntity);
    });
    test("should return null when loadAppointment returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadAppointment(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadAppointment returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadAppointment(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadAppointment throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadAppointment(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadAppointmentByPage with correct values", async () => {
        await testInstance.loadAppointmentByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadAppointmentByPage with correct values", async () => {
        await testInstance.loadAppointmentByPage(fakeQuery);
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
    test("should return a appointmentByPage when loadAppointmentByPage loaded it", async () => {
        const result = await testInstance.loadAppointmentByPage(fakeQuery);
        expect(result).toEqual(fakeAppointmentPaginated);
    });
    test("should return null when loadAppointmentByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadAppointmentByPage(fakeQuery);
        expect(result).toEqual({ appointments: null, total: 0 });
    });
    test("should return null when loadAppointmentByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadAppointmentByPage(null as any);
        expect(result).toEqual({ appointments: null, total: 0 });
    });
    test("should rethrow if load of loadAppointmentByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadAppointmentByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
