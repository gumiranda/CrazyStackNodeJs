import { FidelityEntity } from "./FidelityEntity";
import MockDate from "mockdate";

export const fakeFidelityEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeFidelityEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: "any_ownerId",
    requestId: "any_requestid",
    points: 20,
    clientId: "any_clientid",
};
export const fakeFidelityPaginated = {
    total: 11,
    fidelitys: [
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
        fakeFidelityEntity,
    ],
};

describe("Fidelity", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new FidelityEntity(fakeFidelityEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeFidelityEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
