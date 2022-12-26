import { RequestEntity } from "./RequestEntity";
import MockDate from "mockdate";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";

export const fakeRequestEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeRequestEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    haveDelivery: true,
    haveRecurrence: true,
    haveFidelity: true,
    message: "Olá fulano, gostaria de marcar horário as 10h da manhã",
    serviceId: "fakeServiceId",
    createdForId: "fakeUserId",
    ownerId: "fakeUserId",
    clientId: "fakeUserId",
    clientUserId: "fakeUserId",
    professionalId: "fakeUser2Id",
    status: 10,
    initDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    read: false,
    push: false,
    email: false,
    cancelledAt: null,
    order: fakeOrderEntity,
    fidelity: fakeFidelityEntity,
    recurrence: fakeRecurrenceEntity,
    ride: fakeRideEntity,
    updatedById: "61c1f9d0e399d2917bdff44e",
    updatedByRole: "admin",
};
export const fakeRequestPaginated = {
    total: 11,
    requests: [
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
        fakeRequestEntity,
    ],
};

describe("Request", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new RequestEntity(fakeRequestEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeRequestEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 0,
            updatedById: null,
            updatedByRole: null,
        });
    });
});
