import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { PhotoRepository } from "./photoRepository";
import { fakePhotoEntity, fakePhotoPaginated } from "@/slices/photo/entities/PhotoEntity.spec";

describe("PhotoRepository", () => {
  let fakeQuery: Query;
  let testInstance: PhotoRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    repository = mock<Repository>();
    fakeQuery = { fields: { name: "123" }, options: {} };
    repository.add.mockResolvedValue(fakePhotoEntity);
    repository.getOne.mockResolvedValue(fakePhotoEntity);
    repository.update.mockResolvedValue(fakePhotoEntity);
    repository.getPaginate.mockResolvedValue(fakePhotoPaginated?.photos);
    repository.getCount.mockResolvedValue(fakePhotoPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(() => { testInstance = new PhotoRepository(repository); });
  afterAll(() => { MockDate.reset(); });
  test("should call add of addPhoto with correct values", async () => {
    await testInstance.addPhoto(fakePhotoEntity);
    expect(repository.add).toHaveBeenCalledWith(fakePhotoEntity);
  });
  test("should return a new photo", async () => {
    expect(await testInstance.addPhoto(fakePhotoEntity)).toEqual(fakePhotoEntity);
  });
  test("should return null when addPhoto returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    expect(await testInstance.addPhoto(fakePhotoEntity)).toBeNull();
  });
  test("should rethrow if addPhoto throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.addPhoto(fakePhotoEntity)).rejects.toThrow("Error");
  });
  test("should call deleteOne with correct values", async () => {
    await testInstance.deletePhoto(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return null when deletePhoto returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    expect(await testInstance.deletePhoto(fakeQuery)).toBeNull();
  });
  test("should rethrow if deletePhoto throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.deletePhoto(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getOne of loadPhoto with correct values", async () => {
    await testInstance.loadPhoto(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
  });
  test("should return photo when loadPhoto loads it", async () => {
    expect(await testInstance.loadPhoto(fakeQuery)).toEqual(fakePhotoEntity);
  });
  test("should return null when loadPhoto returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    expect(await testInstance.loadPhoto(fakeQuery)).toBeNull();
  });
  test("should rethrow if loadPhoto throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadPhoto(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getPaginate of loadPhotoByPage with correct values", async () => {
    await testInstance.loadPhotoByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, fakeQuery?.fields, { createdAt: -1 }, 10, {});
  });
  test("should return paginated photos", async () => {
    expect(await testInstance.loadPhotoByPage(fakeQuery)).toEqual(fakePhotoPaginated);
  });
  test("should return null when loadPhotoByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    expect(await testInstance.loadPhotoByPage(fakeQuery)).toEqual({ photos: null, total: 0 });
  });
  test("should rethrow if loadPhotoByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadPhotoByPage(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call update of updatePhoto with correct values", async () => {
    await testInstance.updatePhoto(fakeQuery, fakePhotoEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakePhotoEntity);
  });
  test("should return updated photo", async () => {
    expect(await testInstance.updatePhoto(fakeQuery, fakePhotoEntity)).toEqual(fakePhotoEntity);
  });
  test("should return null when updatePhoto returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    expect(await testInstance.updatePhoto(fakeQuery, fakePhotoEntity)).toBeNull();
  });
  test("should rethrow if updatePhoto throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.updatePhoto(fakeQuery, fakePhotoEntity)).rejects.toThrow("Error");
  });
});
