import { LoadPhotoRepository, UpdatePhotoRepository } from "@/slices/photo/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { LoadPhoto, loadPhoto } from "./LoadPhoto";
import { UploadProvider } from "@/application/infra/storage/contracts/UploadProvider";

describe("LoadPhoto", () => {
  let fakeQuery: Query;
  let testInstance: LoadPhoto;
  let loadPhotoRepository: MockProxy<LoadPhotoRepository & UpdatePhotoRepository>;
  let uploadProvider: MockProxy<UploadProvider>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadPhotoRepository = mock();
    uploadProvider = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadPhotoRepository.loadPhoto.mockResolvedValue(fakePhotoEntity);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    loadPhotoRepository.loadPhoto.mockResolvedValue(fakePhotoEntity);
    testInstance = loadPhoto(loadPhotoRepository, uploadProvider);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadPhoto of LoadPhotoRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadPhotoRepository.loadPhoto).toHaveBeenCalledWith(fakeQuery);
    expect(loadPhotoRepository.loadPhoto).toHaveBeenCalledTimes(1);
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
  it("should renew URL when photo.expiresIn is in the past", async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const expiredPhoto = {
      ...fakePhotoEntity,
      _id: "photo123",
      key: "photo-key",
      provider: "cloudflare_r2",
      expiresIn: pastDate,
      expiresInSeconds: 3600,
    };
    const updatedPhoto = {
      ...expiredPhoto,
      url: "new-signed-url",
      expiresIn: new Date(),
    };
    loadPhotoRepository.loadPhoto.mockResolvedValueOnce(expiredPhoto);
    uploadProvider.getSignedUrl.mockResolvedValueOnce("new-signed-url");
    loadPhotoRepository.updatePhoto.mockResolvedValueOnce(updatedPhoto);
    const result = await testInstance(fakeQuery);
    expect(uploadProvider.getSignedUrl).toHaveBeenCalledWith(
      "photo-key",
      3600
    );
    expect(loadPhotoRepository.updatePhoto).toHaveBeenCalledWith(
      { fields: { _id: "photo123" } },
      expect.objectContaining({
        url: "new-signed-url",
        key: "photo-key",
        provider: "cloudflare_r2",
      })
    );
    expect(result).toEqual(updatedPhoto);
  });
  it("should use default expiresInSeconds of 60 when not set", async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const expiredPhoto = {
      ...fakePhotoEntity,
      _id: "photo123",
      key: "photo-key",
      provider: "cloudflare_r2",
      expiresIn: pastDate,
      expiresInSeconds: undefined,
    };
    loadPhotoRepository.loadPhoto.mockResolvedValueOnce(expiredPhoto);
    uploadProvider.getSignedUrl.mockResolvedValueOnce("new-url");
    loadPhotoRepository.updatePhoto.mockResolvedValueOnce({
      ...expiredPhoto,
      url: "new-url",
    });
    await testInstance(fakeQuery);
    expect(uploadProvider.getSignedUrl).toHaveBeenCalledWith(
      "photo-key",
      60
    );
  });
});
