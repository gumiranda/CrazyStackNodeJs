import { LoadPhotoRepository, UpdatePhotoRepository } from "@/slices/photo/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { LoadPhoto, loadPhoto } from "./LoadPhoto";

describe("LoadPhoto", () => {
  let fakeQuery: Query;
  let testInstance: LoadPhoto;
  let loadPhotoRepository: MockProxy<LoadPhotoRepository & UpdatePhotoRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadPhotoRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadPhotoRepository.loadPhoto.mockResolvedValue(fakePhotoEntity);
  });
  beforeEach(() => {
    testInstance = loadPhoto(loadPhotoRepository, mock());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadPhoto of LoadPhotoRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadPhotoRepository.loadPhoto).toHaveBeenCalledWith(fakeQuery);
    expect(loadPhotoRepository.loadPhoto).toHaveBeenCalledTimes(1);
  });
  it("should return a photo loaded when loadPhotoRepository insert it", async () => {
    const photo = await testInstance(fakeQuery);
    expect(photo).toEqual(fakePhotoEntity);
  });
  it("should return null a new photo loaded when loadPhotoRepository return it", async () => {
    loadPhotoRepository.loadPhoto.mockResolvedValue(null);
    const photo = await testInstance(fakeQuery);
    expect(photo).toBeNull();
  });
  it("should rethrow if loadPhoto of LoadPhotoRepository throws", async () => {
    loadPhotoRepository.loadPhoto.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
