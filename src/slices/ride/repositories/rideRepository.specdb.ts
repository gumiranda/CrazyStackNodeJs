import {
    fakeRideEntity,
    fakeRidePaginated,
} from "@/slices/ride/entities/RideEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { RideData, RidePaginated } from "@/slices/ride/entities";
import {
    AddRideRepository,
    DeleteRideRepository,
    LoadRideByPageRepository,
    LoadRideRepository,
    UpdateRideRepository,
} from "./contracts";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { RideRepository } from "./rideRepository";

describe("Ride Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: RideRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakeRideEntity);
        repository.getOne.mockResolvedValue(fakeRideEntity);
        repository.update.mockResolvedValue(fakeRideEntity);
        repository.getPaginate.mockResolvedValue(fakeRidePaginated?.rides);
        repository.getCount.mockResolvedValue(fakeRidePaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new RideRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addRide with correct values", async () => {
        await testInstance.addRide(fakeRideEntity);
        expect(repository.add).toHaveBeenCalledWith(fakeRideEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new ride created when addRide insert it", async () => {
        const result = await testInstance.addRide(fakeRideEntity);
        expect(result).toEqual(fakeRideEntity);
    });
    test("should return null when addRide returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addRide(fakeRideEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addRide throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addRide(fakeRideEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updateRide throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateRide(fakeQuery, fakeRideEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updateRide with correct values", async () => {
        await testInstance.updateRide(fakeQuery, fakeRideEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeRideEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a ride updated when updateRide update it", async () => {
        const result = await testInstance.updateRide(fakeQuery, fakeRideEntity);
        expect(result).toEqual(fakeRideEntity);
    });
    test("should return a ride updated when updateRide update it when i pass null", async () => {
        const result = await testInstance.updateRide(null as any, fakeRideEntity);
        expect(result).toEqual(fakeRideEntity);
    });
    test("should return null when updateRide returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updateRide(fakeQuery, fakeRideEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updateRide throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updateRide(fakeQuery, fakeRideEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deleteRide with correct values", async () => {
        await testInstance.deleteRide(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new ride created when deleteRide insert it", async () => {
        const result = await testInstance.deleteRide(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deleteRide returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deleteRide(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deleteRide throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deleteRide(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadRide with correct values", async () => {
        await testInstance.loadRide(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a ride when loadRide loaded it", async () => {
        const result = await testInstance.loadRide(fakeQuery);
        expect(result).toEqual(fakeRideEntity);
    });
    test("should return null when loadRide returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadRide(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadRide returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadRide(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadRide throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadRide(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadRideByPage with correct values", async () => {
        await testInstance.loadRideByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadRideByPage with correct values", async () => {
        await testInstance.loadRideByPage(fakeQuery);
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
    test("should return a rideByPage when loadRideByPage loaded it", async () => {
        const result = await testInstance.loadRideByPage(fakeQuery);
        expect(result).toEqual(fakeRidePaginated);
    });
    test("should return null when loadRideByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadRideByPage(fakeQuery);
        expect(result).toEqual({ rides: null, total: 0 });
    });
    test("should return null when loadRideByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadRideByPage(null as any);
        expect(result).toEqual({ rides: null, total: 0 });
    });
    test("should rethrow if load of loadRideByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadRideByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
