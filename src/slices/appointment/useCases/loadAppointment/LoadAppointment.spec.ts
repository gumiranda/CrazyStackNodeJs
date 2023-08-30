import { LoadAppointmentRepository } from "@/slices/appointment/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { LoadAppointment, loadAppointment } from "./LoadAppointment";

describe("LoadAppointment", () => {
  let fakeQuery: Query;
  let testInstance: LoadAppointment;
  let loadAppointmentRepository: MockProxy<LoadAppointmentRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadAppointmentRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadAppointmentRepository.loadAppointment.mockResolvedValue(fakeAppointmentEntity);
  });
  beforeEach(() => {
    testInstance = loadAppointment(loadAppointmentRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadAppointment of LoadAppointmentRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadAppointmentRepository.loadAppointment).toHaveBeenCalledWith(fakeQuery);
    expect(loadAppointmentRepository.loadAppointment).toHaveBeenCalledTimes(1);
  });
  it("should return a appointment loaded when loadAppointmentRepository insert it", async () => {
    const appointment = await testInstance(fakeQuery);
    expect(appointment).toEqual(fakeAppointmentEntity);
  });
  it("should return null a new appointment loaded when loadAppointmentRepository return it", async () => {
    loadAppointmentRepository.loadAppointment.mockResolvedValue(null);
    const appointment = await testInstance(fakeQuery);
    expect(appointment).toBeNull();
  });
  it("should rethrow if loadAppointment of LoadAppointmentRepository throws", async () => {
    loadAppointmentRepository.loadAppointment.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
