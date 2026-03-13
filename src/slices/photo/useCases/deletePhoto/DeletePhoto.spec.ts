import { describe, it, expect, beforeEach, jest } from "bun:test";
import { deletePhoto } from "./DeletePhoto";

describe("deletePhoto", () => {
  let deletePhotoRepository: any;
  let uploadPhotoProvider: any;

  const fakeQuery = { fields: { _id: "photo_id", key: "photo_key.jpg" } };
  const fakePhoto = { _id: "photo_id", url: "http://photo.com/1.jpg", key: "photo_key.jpg" };

  beforeEach(() => {
    jest.clearAllMocks();
    deletePhotoRepository = {
      deletePhoto: jest.fn().mockResolvedValue(fakePhoto),
    };
    uploadPhotoProvider = {
      delete: jest.fn().mockResolvedValue(undefined),
    };
  });

  it("should call uploadProvider.delete with correct fileName", async () => {
    const sut = deletePhoto(deletePhotoRepository, uploadPhotoProvider);
    await sut(fakeQuery);
    expect(uploadPhotoProvider.delete).toHaveBeenCalledWith({ fileName: "photo_key.jpg" });
  });

  it("should call deletePhotoRepository with correct query", async () => {
    const sut = deletePhoto(deletePhotoRepository, uploadPhotoProvider);
    await sut(fakeQuery);
    expect(deletePhotoRepository.deletePhoto).toHaveBeenCalledWith(fakeQuery);
  });

  it("should return deleted photo data", async () => {
    const sut = deletePhoto(deletePhotoRepository, uploadPhotoProvider);
    const result = await sut(fakeQuery);
    expect(result).toEqual(fakePhoto);
  });

  it("should delete from storage before repository", async () => {
    const order: string[] = [];
    uploadPhotoProvider.delete.mockImplementation(async () => { order.push("storage"); });
    deletePhotoRepository.deletePhoto.mockImplementation(async () => { order.push("repo"); return fakePhoto; });
    const sut = deletePhoto(deletePhotoRepository, uploadPhotoProvider);
    await sut(fakeQuery);
    expect(order).toEqual(["storage", "repo"]);
  });
});
