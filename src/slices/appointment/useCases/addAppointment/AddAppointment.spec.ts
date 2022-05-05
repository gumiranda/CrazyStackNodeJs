import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { AppointmentEntity } from "@/slices/appointment/entities";
import { AddAppointmentRepository } from "@/slices/appointment/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addAppointment } from "./AddAppointment";

describe("addAppointment", () => {
    let testInstance: any;
    let addAppointmentRepository: MockProxy<AddAppointmentRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addAppointmentRepository = mock();
        addAppointmentRepository.addAppointment.mockResolvedValue(fakeAppointmentEntity);
    });
    beforeEach(() => {
        testInstance = addAppointment(addAppointmentRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addAppointment of AddAppointmentRepository with correct values", async () => {
        await testInstance(fakeAppointmentEntity);
        expect(addAppointmentRepository.addAppointment).toHaveBeenCalledWith(
            new AppointmentEntity(fakeAppointmentEntity)
        );
        expect(addAppointmentRepository.addAppointment).toHaveBeenCalledTimes(1);
    });
    it("should return a new appointment created when addAppointmentRepository insert it", async () => {
        const appointment = await testInstance(fakeAppointmentEntity);
        expect(appointment).toEqual(fakeAppointmentEntity);
    });
    it("should return null a new appointment created when addAppointmentRepository insert it", async () => {
        addAppointmentRepository.addAppointment.mockResolvedValue(null);
        const appointment = await testInstance(fakeAppointmentEntity);
        expect(appointment).toBeNull();
    });
    it("should rethrow if addAppointment of AddAppointmentRepository throws", async () => {
        addAppointmentRepository.addAppointment.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeAppointmentEntity)).rejects.toThrowError("any_error");
    });
});
