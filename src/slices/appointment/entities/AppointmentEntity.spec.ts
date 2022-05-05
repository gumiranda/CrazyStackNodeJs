import { AppointmentEntity } from "./AppointmentEntity";
import MockDate from "mockdate";

export const fakeAppointmentEntity = {
    _id: "123",
    createdById: "123",
    name: "fakeAppointmentEntity",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    requestId: "fakeRequestId",
    cancelled: true,
    message: "Olá fulano, gostaria de marcar horário as 10h da manhã",
    serviceId: "fakeServiceId",
    createdForId: "fakeUserId",
    ownerId: "fakeUserId",
    clientId: "fakeUserId",
    professionalId: "fakeUserId",
    status: "pending",
    initDate: new Date(),
    endDate: new Date(),
    read: false,
    push: false,
    email: false,
    cancelledAt: null,
};
export const fakeAppointmentPaginated = {
    total: 11,
    appointments: [
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
        fakeAppointmentEntity,
    ],
};

describe("Appointment", () => {
    beforeAll(async () => {
        MockDate.set(new Date());
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("can be created", () => {
        const obj = new AppointmentEntity(fakeAppointmentEntity);
        expect(obj).toBeTruthy();
        expect(obj).toEqual({
            ...fakeAppointmentEntity,
            _id: undefined,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            cancelled: false,
            cancelledBy: undefined,
        });
    });
});
