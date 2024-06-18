import { PhotoEntity } from "./PhotoEntity";
import MockDate from "mockdate";

export const fakePhotoEntity = {
    _id: "123",
    createdById: "123",
    name: "fakePhotoEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const fakePhotoPaginated = {
    total: 11,
    photos: [
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
        fakePhotoEntity,
    ],
};

describe("Photo", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new PhotoEntity(fakePhotoEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakePhotoEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
