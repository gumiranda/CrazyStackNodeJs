import { UpdatePhotoRepository } from "@/slices/photo/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { UpdatePhoto, updatePhoto } from "./UpdatePhoto";

describe("UpdatePhoto", () => {
    let fakeQuery: Query;
    let testInstance: UpdatePhoto;
    let updatePhotoRepository: MockProxy<UpdatePhotoRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updatePhotoRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updatePhotoRepository.updatePhoto.mockResolvedValue(fakePhotoEntity);
    });
    beforeEach(() => {
        testInstance = updatePhoto(updatePhotoRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updatePhoto of UpdatePhotoRepository with correct values", async () => {
        await testInstance(fakeQuery, fakePhotoEntity);
        expect(updatePhotoRepository.updatePhoto).toHaveBeenCalledWith(
            fakeQuery,
            fakePhotoEntity
        );
        expect(updatePhotoRepository.updatePhoto).toHaveBeenCalledTimes(1);
    });
    it("should return a photo updateed when updatePhotoRepository insert it", async () => {
        const photo = await testInstance(fakeQuery, fakePhotoEntity);
        expect(photo).toEqual(fakePhotoEntity);
    });
    it("should return null a new photo updateed when updatePhotoRepository return it", async () => {
        updatePhotoRepository.updatePhoto.mockResolvedValue(null);
        const photo = await testInstance(fakeQuery, fakePhotoEntity);
        expect(photo).toBeNull();
    });
    it("should rethrow if updatePhoto of UpdatePhotoRepository throws", async () => {
        updatePhotoRepository.updatePhoto.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakePhotoEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
