import { OwnerEntity } from "./OwnerEntity";
import MockDate from "mockdate";

export const fakeOwnerEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeOwnerEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    costByTimeDriving: 1.2,
    minimumTimeForReSchedule: 50,
    fidelityTaxPoints: 20,
    appointmentsTotal: 3,
    ratingsTotal: 4,
    haveDelivery: true,
    days1: {
        monday1: true,
        sunday1: true,
        tuesday1: true,
        thursday1: true,
        friday1: true,
        wednsday1: true,
        saturday1: true,
    },
    hourEnd1: "23:59",
    hourStart1: "00:00",
    typeTax: "fixed",
};
export const fakeOwnerPaginated = {
    total: 11,
    owners: [
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
        fakeOwnerEntity,
    ],
};

describe("Owner", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new OwnerEntity(fakeOwnerEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeOwnerEntity,
            _id: undefined,
            active: false,
            appointmentsTotal: 0,
            ratingsTotal: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
