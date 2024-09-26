import { fakePhotoEntity } from "@/slices/photo/entities/PhotoEntity.spec";
import { PhotoEntity } from "@/slices/photo/entities";
import { AddPhotoRepository } from "@/slices/photo/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addPhoto } from "./AddPhoto";

describe("addPhoto", () => {
    let testInstance: any;
    let addPhotoRepository: MockProxy<AddPhotoRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addPhotoRepository = mock();
        addPhotoRepository.addPhoto.mockResolvedValue(fakePhotoEntity);
    });
    beforeEach(() => {
        testInstance = addPhoto(addPhotoRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addPhoto of AddPhotoRepository with correct values", async () => {
        await testInstance(fakePhotoEntity);
        expect(addPhotoRepository.addPhoto).toHaveBeenCalledWith(
            new PhotoEntity(fakePhotoEntity)
        );
        expect(addPhotoRepository.addPhoto).toHaveBeenCalledTimes(1);
    });
    it("should return a new photo created when addPhotoRepository insert it", async () => {
        const photo = await testInstance(fakePhotoEntity);
        expect(photo).toEqual(fakePhotoEntity);
    });
    it("should return null a new photo created when addPhotoRepository insert it", async () => {
        addPhotoRepository.addPhoto.mockResolvedValue(null);
        const photo = await testInstance(fakePhotoEntity);
        expect(photo).toBeNull();
    });
    it("should rethrow if addPhoto of AddPhotoRepository throws", async () => {
        addPhotoRepository.addPhoto.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakePhotoEntity)).rejects.toThrowError("any_error");
    });
});
