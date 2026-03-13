import { describe, it, test, expect, beforeAll, beforeEach, afterAll, jest } from "bun:test";
import MockDate from "mockdate";
import { MockProxy, mock } from "jest-mock-extended";

import { UpdateRequestById } from "@/slices/request/useCases/updateRequestById/UpdateRequestById";

import {
  LoadRequestRepository,
  UpdateRequestRepository,
} from "@/slices/request/repositories";

import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";

import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { subMinutes } from "@/application/helpers/dateFns";

describe("UpdateRequestById useCase", () => {
  let testInstance: UpdateRequestById;
  let mockRepo: MockProxy<UpdateRequestRepository & LoadRequestRepository>;
  let mockAppointment: MockProxy<
    AddAppointmentRepository & LoadAppointmentRepository & UpdateAppointmentRepository
  >;
  beforeAll(() => {
    MockDate.set(new Date());
    mockRepo = mock();
    mockRepo.updateRequest.mockResolvedValue({ ...fakeRequestEntity, status: 10 });
    mockRepo.loadRequest.mockResolvedValue({
      ...fakeRequestEntity,
      status: 1,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    mockAppointment = mock();
    mockAppointment.addAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.loadAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.updateAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
  });
  beforeEach(async () => {
    jest.clearAllMocks();
    mockRepo.updateRequest.mockResolvedValue({ ...fakeRequestEntity, status: 10 });
    mockRepo.loadRequest.mockResolvedValue({
      ...fakeRequestEntity,
      status: 1,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    mockAppointment.addAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.loadAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.updateAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    testInstance = new UpdateRequestById(mockRepo, mockAppointment);
  });
  afterAll(() => {
    MockDate.reset();
  });
  it("Should return an request updated with success", async () => {
    const request = await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(request).toEqual({ ...fakeRequestEntity, status: 10 });
  });
  it("Should call updateRequest method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockRepo.updateRequest).toHaveBeenCalledWith(
      {
        fields: { _id: fakeRequestEntity._id },
        options: {},
      },
      {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      }
    );
    expect(mockRepo.updateRequest).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not updated request after call loadRequest", async () => {
    mockRepo.loadRequest.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao atualizar a solicitação");
  });
  it("Should throws if was not updated request after call updateRequest", async () => {
    mockRepo.updateRequest.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao atualizar a solicitação");
  });
  it("Should throws if loadRequest throws", async () => {
    mockRepo.loadRequest.mockRejectedValueOnce(new Error("any_error"));
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("any_error");
  });
  it("Should throws if updateRequest throws", async () => {
    mockRepo.updateRequest.mockRejectedValueOnce(new Error("any_error"));
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("any_error");
  });
  it("Should throws if was not add appointment after call addappointment when status is 1", async () => {
    mockAppointment.addAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 1,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível criar o agendamento");
  });
  it("Should throws if was not add appointment after call addappointment when status is 7", async () => {
    mockAppointment.addAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 7,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível criar o agendamento");
  });
  it("Should throws if was not cancel appointment after call updateAppointment when status is 2", async () => {
    mockAppointment.updateAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 2,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível cancelar o agendamento");
  });
  it("Should throws if was not cancel appointment after call updateAppointment when status is 3", async () => {
    mockAppointment.updateAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 3,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível cancelar o agendamento");
  });
  it("Should throws if was not cancel appointment after call updateAppointment when status is 5", async () => {
    mockAppointment.updateAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 5,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível cancelar o agendamento");
  });
  it("Should throws if was not cancel appointment after call updateAppointment when status is 6", async () => {
    mockAppointment.updateAppointment.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 6,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível cancelar o agendamento");
  });
  test("should call mockAppointment.addAppointment method with correct values", async () => {
    const newfakeRequestEntity = { ...fakeRequestEntity, status: 7 };
    mockRepo.updateRequest.mockResolvedValueOnce(newfakeRequestEntity);
    await testInstance.updateRequestById("123", fakeRequestEntity);
    expect(mockAppointment.addAppointment).toHaveBeenCalledWith({
      requestId: "123",
      name: "agendamentoCriado",
      message: fakeRequestEntity?.message,
      serviceId: fakeRequestEntity?.serviceId,
      ownerId: fakeRequestEntity?.ownerId,
      clientId: fakeRequestEntity?.clientId,
      status: 1,
      createdById: fakeRequestEntity?.createdById,
      read: false,
      push: false,
      email: false,
      active: true,
      initDate: fakeRequestEntity?.initDate,
      endDate: fakeRequestEntity?.endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      cancelled: false,
      professionalId: fakeRequestEntity?.professionalId,
    });
    expect(mockAppointment.addAppointment).toHaveBeenCalledTimes(1);
  });
});
