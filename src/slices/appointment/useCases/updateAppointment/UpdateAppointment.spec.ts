import { UpdateAppointmentRepository } from "@/slices/appointment/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { UpdateAppointment, updateAppointment } from "./UpdateAppointment";

describe("UpdateAppointment", () => {
    let fakeQuery: Query;
    let testInstance: UpdateAppointment;
    let updateAppointmentRepository: MockProxy<UpdateAppointmentRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateAppointmentRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateAppointmentRepository.updateAppointment.mockResolvedValue(fakeAppointmentEntity);
    });
    beforeEach(() => {
        testInstance = updateAppointment(updateAppointmentRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateAppointment of UpdateAppointmentRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeAppointmentEntity);
        expect(updateAppointmentRepository.updateAppointment).toHaveBeenCalledWith(
            fakeQuery,
            fakeAppointmentEntity
        );
        expect(updateAppointmentRepository.updateAppointment).toHaveBeenCalledTimes(1);
    });
    it("should return a appointment updateed when updateAppointmentRepository insert it", async () => {
        const appointment = await testInstance(fakeQuery, fakeAppointmentEntity);
        expect(appointment).toEqual(fakeAppointmentEntity);
    });
    it("should return null a new appointment updateed when updateAppointmentRepository return it", async () => {
        updateAppointmentRepository.updateAppointment.mockResolvedValue(null);
        const appointment = await testInstance(fakeQuery, fakeAppointmentEntity);
        expect(appointment).toBeNull();
    });
    it("should rethrow if updateAppointment of UpdateAppointmentRepository throws", async () => {
        updateAppointmentRepository.updateAppointment.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeAppointmentEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
