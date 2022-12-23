import { SilvioSantosEntity } from "./SilvioSantosEntity";
import MockDate from "mockdate";

export const fakeSilvioSantosEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeSilvioSantosEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const fakeSilvioSantosPaginated = {
    total: 11,
    silvioSantoss: [
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
        fakeSilvioSantosEntity,
    ],
};

describe("SilvioSantos", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new SilvioSantosEntity(fakeSilvioSantosEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeSilvioSantosEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
