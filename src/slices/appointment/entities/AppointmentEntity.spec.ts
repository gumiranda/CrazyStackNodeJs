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
    status: 0,
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
export const fakeAvailableTimesEntity = {
    _id: {
        hourStart1: "8:00",
        hourEnd1: "18:00",
        hourLunchEnd1: "13:00",
        hourLunchStart1: "12:00",
        hourStart2: "8:00",
        hourEnd2: "18:00",
        hourLunchEnd2: "13:00",
        hourLunchStart2: "12:00",
        hourStart3: "8:00",
        hourEnd3: "18:00",
        hourLunchEnd3: "13:00",
        hourLunchStart3: "12:00",
        days1: {
            monday1: true,
            sunday1: false,
            tuesday1: true,
            thursday1: true,
            friday1: true,
            wednsday1: false,
            saturday1: false,
        },
        days2: {
            monday2: false,
            sunday2: false,
            tuesday2: false,
            thursday2: false,
            friday2: false,
            wednsday2: true,
            saturday2: false,
        },
        days3: {
            monday3: false,
            sunday3: false,
            tuesday3: false,
            thursday3: false,
            friday3: false,
            wednsday3: false,
            saturday3: true,
        },
    },
    data: [],
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
