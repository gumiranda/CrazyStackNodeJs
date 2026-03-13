import { mock, MockProxy } from "jest-mock-extended";
import MockDate from "mockdate";
import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { AppointmentHandler } from "./appointmentHandler";

type AppointmentRepo = AddAppointmentRepository &
  LoadAppointmentRepository &
  UpdateAppointmentRepository;

describe("AppointmentHandler", () => {
  let sut: AppointmentHandler;
  let appointmentRepository: MockProxy<AppointmentRepo>;

  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    appointmentRepository = mock();
    appointmentRepository.addAppointment.mockResolvedValue({
      _id: "appointmentId",
      name: "agendamentoCriado",
    } as any);
    appointmentRepository.loadAppointment.mockResolvedValue({
      _id: "appointmentId",
      name: "existingAppointment",
    } as any);
    appointmentRepository.updateAppointment.mockResolvedValue({
      _id: "appointmentId",
      cancelled: true,
    } as any);
    sut = new AppointmentHandler(appointmentRepository);
  });

  test("should create appointment when status is 1", async () => {
    const request = {
      _id: "requestId",
      status: 1,
      message: "test message",
      serviceId: "serviceId",
      ownerId: "ownerId",
      professionalId: "professionalId",
      clientId: "clientId",
      createdById: "createdById",
      initDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      serviceName: "Corte",
      professionalName: "John",
      clientName: "Jane",
      ownerName: "Owner",
    };
    await sut.handle(request);
    expect(appointmentRepository.addAppointment).toHaveBeenCalledTimes(1);
    expect(appointmentRepository.addAppointment).toHaveBeenCalledWith(
      expect.objectContaining({
        requestId: "requestId",
        name: "agendamentoCriado",
        status: 1,
        active: true,
        read: false,
        push: false,
        email: false,
        cancelled: false,
      })
    );
  });

  test("should create appointment when status is 7", async () => {
    const request = { _id: "requestId", status: 7 };
    await sut.handle(request);
    expect(appointmentRepository.addAppointment).toHaveBeenCalledTimes(1);
  });

  test("should throw when addAppointment returns falsy", async () => {
    appointmentRepository.addAppointment.mockResolvedValue(null as any);
    const request = { _id: "requestId", status: 1 };
    await expect(sut.handle(request)).rejects.toThrow(
      "Não foi possível criar o agendamento"
    );
  });

  test("should cancel appointment when status is 2", async () => {
    const request = { _id: "requestId", status: 2, createdById: "userId" };
    await sut.handle(request);
    expect(appointmentRepository.loadAppointment).toHaveBeenCalledTimes(1);
    expect(appointmentRepository.updateAppointment).toHaveBeenCalledTimes(1);
    expect(appointmentRepository.updateAppointment).toHaveBeenCalledWith(
      { fields: { _id: "appointmentId" } },
      expect.objectContaining({
        cancelled: true,
        active: false,
        cancelledBy: "userId",
      })
    );
  });

  test("should cancel appointment when status is 3", async () => {
    const request = { _id: "requestId", status: 3, createdById: "userId" };
    await sut.handle(request);
    expect(appointmentRepository.loadAppointment).toHaveBeenCalledTimes(1);
    expect(appointmentRepository.updateAppointment).toHaveBeenCalledTimes(1);
  });

  test("should cancel appointment when status is 5", async () => {
    const request = { _id: "requestId", status: 5, createdById: "userId" };
    await sut.handle(request);
    expect(appointmentRepository.loadAppointment).toHaveBeenCalledTimes(1);
    expect(appointmentRepository.updateAppointment).toHaveBeenCalledTimes(1);
  });

  test("should cancel appointment when status is 6", async () => {
    const request = { _id: "requestId", status: 6, createdById: "userId" };
    await sut.handle(request);
    expect(appointmentRepository.loadAppointment).toHaveBeenCalledTimes(1);
    expect(appointmentRepository.updateAppointment).toHaveBeenCalledTimes(1);
  });

  test("should throw when updateAppointment returns falsy", async () => {
    appointmentRepository.updateAppointment.mockResolvedValue(null as any);
    const request = { _id: "requestId", status: 2, createdById: "userId" };
    await expect(sut.handle(request)).rejects.toThrow(
      "Não foi possível cancelar o agendamento"
    );
  });

  test("should not update appointment when loadAppointment returns no _id", async () => {
    appointmentRepository.loadAppointment.mockResolvedValue({} as any);
    const request = { _id: "requestId", status: 2, createdById: "userId" };
    await sut.handle(request);
    expect(appointmentRepository.updateAppointment).not.toHaveBeenCalled();
  });

  test("should not create or cancel appointment for other statuses", async () => {
    const request = { _id: "requestId", status: 4 };
    await sut.handle(request);
    expect(appointmentRepository.addAppointment).not.toHaveBeenCalled();
    expect(appointmentRepository.loadAppointment).not.toHaveBeenCalled();
    expect(appointmentRepository.updateAppointment).not.toHaveBeenCalled();
  });

  test("should call super.handle and return null when no next handler", async () => {
    const request = { _id: "requestId", status: 4 };
    const result = await sut.handle(request);
    expect(result).toBeNull();
  });
});
