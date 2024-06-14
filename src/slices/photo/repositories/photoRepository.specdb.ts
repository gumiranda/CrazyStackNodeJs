import {
    fakePhotoEntity,
    fakePhotoPaginated,
} from "@/slices/photo/entities/PhotoEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { PhotoRepository } from "./photoRepository";

describe("Photo Mongo Repository", () => {
    let fakeQuery: Query;
    let testInstance: PhotoRepository;
    let repository: MockProxy<Repository>;
    beforeAll(async () => {
        fakeQuery = { fields: { name: "123" }, options: {} };
        MockDate.set(new Date());
        repository = mock<Repository>();
        repository.add.mockResolvedValue(fakePhotoEntity);
        repository.getOne.mockResolvedValue(fakePhotoEntity);
        repository.update.mockResolvedValue(fakePhotoEntity);
        repository.getPaginate.mockResolvedValue(fakePhotoPaginated?.photos);
        repository.getCount.mockResolvedValue(fakePhotoPaginated?.total);
        repository.deleteOne.mockResolvedValue(true);
    });
    beforeEach(async () => {
        testInstance = new PhotoRepository(repository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    test("should call add of addPhoto with correct values", async () => {
        await testInstance.addPhoto(fakePhotoEntity);
        expect(repository.add).toHaveBeenCalledWith(fakePhotoEntity);
        expect(repository.add).toHaveBeenCalledTimes(1);
    });
    test("should return a new photo created when addPhoto insert it", async () => {
        const result = await testInstance.addPhoto(fakePhotoEntity);
        expect(result).toEqual(fakePhotoEntity);
    });
    test("should return null when addPhoto returns null", async () => {
        repository.add.mockResolvedValueOnce(null);
        const result = await testInstance.addPhoto(fakePhotoEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if add of addPhoto throws", async () => {
        repository.add.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.addPhoto(fakePhotoEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should rethrow if update of updatePhoto throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updatePhoto(fakeQuery, fakePhotoEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call update of updatePhoto with correct values", async () => {
        await testInstance.updatePhoto(fakeQuery, fakePhotoEntity);
        expect(repository.update).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakePhotoEntity
        );
        expect(repository.update).toHaveBeenCalledTimes(1);
    });
    test("should return a photo updated when updatePhoto update it", async () => {
        const result = await testInstance.updatePhoto(fakeQuery, fakePhotoEntity);
        expect(result).toEqual(fakePhotoEntity);
    });
    test("should return a photo updated when updatePhoto update it when i pass null", async () => {
        const result = await testInstance.updatePhoto(null as any, fakePhotoEntity);
        expect(result).toEqual(fakePhotoEntity);
    });
    test("should return null when updatePhoto returns null", async () => {
        repository.update.mockResolvedValueOnce(null);
        const result = await testInstance.updatePhoto(fakeQuery, fakePhotoEntity);
        expect(result).toBeNull();
    });
    test("should rethrow if update of updatePhoto throws", async () => {
        repository.update.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.updatePhoto(fakeQuery, fakePhotoEntity);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call delete of deletePhoto with correct values", async () => {
        await testInstance.deletePhoto(fakeQuery);
        expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.deleteOne).toHaveBeenCalledTimes(1);
    });
    test("should return a new photo created when deletePhoto insert it", async () => {
        const result = await testInstance.deletePhoto(fakeQuery);
        expect(result).toEqual(true);
    });
    test("should return null when deletePhoto returns null", async () => {
        repository.deleteOne.mockResolvedValueOnce(null);
        const result = await testInstance.deletePhoto(fakeQuery);
        expect(result).toBeNull();
    });
    test("should rethrow if delete of deletePhoto throws", async () => {
        repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.deletePhoto(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call load of loadPhoto with correct values", async () => {
        await testInstance.loadPhoto(fakeQuery);
        expect(repository.getOne).toHaveBeenCalledWith(
            fakeQuery?.fields,
            fakeQuery?.options
        );
        expect(repository.getOne).toHaveBeenCalledTimes(1);
    });
    test("should return a photo when loadPhoto loaded it", async () => {
        const result = await testInstance.loadPhoto(fakeQuery);
        expect(result).toEqual(fakePhotoEntity);
    });
    test("should return null when loadPhoto returns null", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadPhoto(fakeQuery);
        expect(result).toBeNull();
    });
    test("should return null when loadPhoto returns null passing null as parameter", async () => {
        repository.getOne.mockResolvedValueOnce(null);
        const result = await testInstance.loadPhoto(null as any);
        expect(result).toBeNull();
    });
    test("should rethrow if load of loadPhoto throws", async () => {
        repository.getOne.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadPhoto(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
    test("should call getCount of loadPhotoByPage with correct values", async () => {
        await testInstance.loadPhotoByPage(fakeQuery);
        expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
        expect(repository.getCount).toHaveBeenCalledTimes(1);
    });
    test("should call getPaginate of loadPhotoByPage with correct values", async () => {
        await testInstance.loadPhotoByPage(fakeQuery);
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
    test("should return a photoByPage when loadPhotoByPage loaded it", async () => {
        const result = await testInstance.loadPhotoByPage(fakeQuery);
        expect(result).toEqual(fakePhotoPaginated);
    });
    test("should return null when loadPhotoByPage returns null", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadPhotoByPage(fakeQuery);
        expect(result).toEqual({ photos: null, total: 0 });
    });
    test("should return null when loadPhotoByPage returns null passing null as parameter", async () => {
        repository.getPaginate.mockResolvedValueOnce(null);
        repository.getCount.mockResolvedValueOnce(0);
        const result = await testInstance.loadPhotoByPage(null as any);
        expect(result).toEqual({ photos: null, total: 0 });
    });
    test("should rethrow if load of loadPhotoByPage throws", async () => {
        repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
        const result = testInstance.loadPhotoByPage(fakeQuery);
        await expect(result).rejects.toThrow("Error");
    });
});
