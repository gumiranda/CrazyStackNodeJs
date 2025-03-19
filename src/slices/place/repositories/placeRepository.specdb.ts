import {
    fakePlaceEntity,
    fakePlacePaginated,
} from "@/slices/place/entities/PlaceEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { PlaceRepository } from "./placeRepository";

describe("Place Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: PlaceRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakePlaceEntity);
        repository.getOne.mockResolvedValue(fakePlaceEntity);
        repository.update.mockResolvedValue(fakePlaceEntity);
        repository.getPaginate.mockResolvedValue(fakePlacePaginated?.places);
        repository.getCount.mockResolvedValue(fakePlacePaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new PlaceRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addPlace with correct values", async () => {
        await testInstance.addPlace(fakePlaceEntity);
        expect(repository.add).toHaveBeenCalledWith(fakePlaceEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new place created when addPlace insert it", async () => {
        const result = await testInstance.addPlace(fakePlaceEntity);
        expect(result).toEqual(fakePlaceEntity);
    });
    test("should return null when addPlace returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addPlace(fakePlaceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addPlace throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addPlace(fakePlaceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updatePlace throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updatePlace(fakeQuery, fakePlaceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updatePlace with correct values", async () => {
        await testInstance.updatePlace(fakeQuery, fakePlaceEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakePlaceEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a place updated when updatePlace update it", async () => {
        const result = await testInstance.updatePlace(fakeQuery, fakePlaceEntity);
        expect(result).toEqual(fakePlaceEntity);
    });
    test("should return a place updated when updatePlace update it when i pass null", async () => {
        const result = await testInstance.updatePlace(null as any, fakePlaceEntity);
        expect(result).toEqual(fakePlaceEntity);
    });
    test("should return null when updatePlace returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updatePlace(fakeQuery, fakePlaceEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updatePlace throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updatePlace(fakeQuery, fakePlaceEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deletePlace with correct values", async () => {
        await testInstance.deletePlace(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new place created when deletePlace insert it", async () => {
        const result = await testInstance.deletePlace(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deletePlace returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deletePlace(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deletePlace throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deletePlace(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadPlace with correct values", async () => {
        await testInstance.loadPlace(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a place when loadPlace loaded it", async () => {
        const result = await testInstance.loadPlace(fakeQuery);
        expect(result).toEqual(fakePlaceEntity);
    });
    test("should return null when loadPlace returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadPlace(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadPlace returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadPlace(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadPlace throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadPlace(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadPlaceByPage with correct values", async () => {
        await testInstance.loadPlaceByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadPlaceByPage with correct values", async () => {
        await testInstance.loadPlaceByPage(fakeQuery);
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
    test("should return a placeByPage when loadPlaceByPage loaded it", async () => {
        const result = await testInstance.loadPlaceByPage(fakeQuery);
        expect(result).toEqual(fakePlacePaginated);
    });
    test("should return null when loadPlaceByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadPlaceByPage(fakeQuery);
        expect(result).toEqual({ places: null, total: 0 });
    });
    test("should return null when loadPlaceByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadPlaceByPage(null as any);
        expect(result).toEqual({ places: null, total: 0 });
    });
    test("should rethrow if load of loadPlaceByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadPlaceByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
