import { LoadPhotoByPageRepository } from "@/slices/photo/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakePhotoPaginated } from "@/slices/photo/entities/PhotoEntity.spec";
import { LoadPhotoByPage, loadPhotoByPage } from "./LoadPhotoByPage";

describe("LoadPhotoByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadPhotoByPage;
    let loadPhotoByPageRepository: MockProxy<LoadPhotoByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadPhotoByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadPhotoByPageRepository.loadPhotoByPage.mockResolvedValue(
            fakePhotoPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadPhotoByPage(loadPhotoByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadPhotoByPage of LoadPhotoByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadPhotoByPageRepository.loadPhotoByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadPhotoByPageRepository.loadPhotoByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a photo loaded when loadPhotoByPageRepository insert it", async () => {
        const photo = await testInstance(fakeQuery);
        expect(photo).toEqual(fakePhotoPaginated);
    });
    it("should return null a new photo loaded when loadPhotoByPageRepository return it", async () => {
        loadPhotoByPageRepository.loadPhotoByPage.mockResolvedValue(null);
        const photo = await testInstance(fakeQuery);
        expect(photo).toBeNull();
    });
    it("should rethrow if loadPhotoByPage of LoadPhotoByPageRepository throws", async () => {
        loadPhotoByPageRepository.loadPhotoByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
