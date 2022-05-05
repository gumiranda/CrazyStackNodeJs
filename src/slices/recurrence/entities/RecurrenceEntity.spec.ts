import { RecurrenceEntity } from "./RecurrenceEntity";
import MockDate from "mockdate";

export const fakeRecurrenceEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeRecurrenceEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 0,
    frequency: 3,
    endDate: new Date(),
    initDate: new Date(),
    serviceId: "fakeServiceId",
    professionalId: "fakeUserId",
    clientId: "fakeUserId",
    ownerId: "fakeUserId",
    accept: false,
    appointmentsWasInserted: false,
    requestId: "fakeRequestId",
};
export const fakeRecurrencePaginated = {
    total: 11,
    recurrences: [
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
        fakeRecurrenceEntity,
    ],
};

describe("Recurrence", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new RecurrenceEntity(fakeRecurrenceEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeRecurrenceEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    });
});
