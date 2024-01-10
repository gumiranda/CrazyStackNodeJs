import MockDate from "mockdate";
import { MockProxy, mock } from "jest-mock-extended";

import { UpdateRequestById } from "@/slices/request/useCases/updateRequestById/UpdateRequestById";

import { RequestData } from "@/slices/request/entities";
import {
  LoadRequestRepository,
  UpdateRequestRepository,
} from "@/slices/request/repositories";

import { IUpdateRequestById } from "./contracts";
import { AddOrderRepository } from "@/slices/order/repositories";
import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { UpdateClientRepository } from "@/slices/client/repositories";

import { AddFidelityRepository } from "@/slices/fidelity/repositories";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { AddRideRepository } from "@/slices/ride/repositories";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { UpdateUserRepository } from "@/slices/user/repositories";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { fakeFidelityEntity } from "@/slices/fidelity/entities/FidelityEntity.spec";
import { fakeOrderEntity } from "@/slices/order/entities/OrderEntity.spec";
import { fakeAppointmentEntity } from "@/slices/appointment/entities/AppointmentEntity.spec";
import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { fakeRecurrenceEntity } from "@/slices/recurrence/entities/RecurrenceEntity.spec";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";
import { subMinutes } from "@/application/helpers/dateFns";

describe("UpdateRequestById useCase", () => {
  let testInstance: UpdateRequestById;
  let mockRepo: MockProxy<UpdateRequestRepository & LoadRequestRepository>;
  let mockOrder: MockProxy<AddOrderRepository>;
  let mockAppointment: MockProxy<
    AddAppointmentRepository & LoadAppointmentRepository & UpdateAppointmentRepository
  >;
  let mockService: MockProxy<UpdateServiceRepository>;
  let mockRide: MockProxy<AddRideRepository>;
  let mockRecurrence: MockProxy<AddRecurrenceRepository>;
  let mockFidelity: MockProxy<AddFidelityRepository>;
  let mockClient: MockProxy<UpdateClientRepository>;
  let mockUser: MockProxy<UpdateUserRepository>;
  beforeAll(() => {
    MockDate.set(new Date());
    mockRepo = mock();
    mockRepo.updateRequest.mockResolvedValue({ ...fakeRequestEntity, status: 10 });
    mockRepo.loadRequest.mockResolvedValue({
      ...fakeRequestEntity,
      status: 1,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    mockOrder = mock();
    mockOrder.addOrder.mockResolvedValue({ ...fakeOrderEntity });
    mockAppointment = mock();
    mockAppointment.addAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.loadAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockAppointment.updateAppointment.mockResolvedValue({ ...fakeAppointmentEntity });
    mockService = mock();
    mockService.updateService.mockResolvedValue({ ...fakeServiceEntity });
    mockService.incrementAppointmentsTotal.mockResolvedValue({ ...fakeServiceEntity });
    mockRide = mock();
    mockRide.addRide.mockResolvedValue({ ...fakeRideEntity });
    mockRecurrence = mock();
    mockRecurrence.addRecurrence.mockResolvedValue({ ...fakeRecurrenceEntity });
    mockFidelity = mock();
    mockFidelity.addFidelity.mockResolvedValue({ ...fakeFidelityEntity });
    mockClient = mock();
    mockClient.updateClient.mockResolvedValue({ ...fakeClientEntity });
    mockClient.incrementAppointmentsTotal.mockResolvedValue({ ...fakeClientEntity });
    mockUser = mock();
    mockUser.updateUser.mockResolvedValue({ ...fakeUserEntity });
    mockUser.incrementAppointmentsTotal.mockResolvedValue({ ...fakeUserEntity });
  });
  beforeEach(async () => {
    testInstance = new UpdateRequestById(
      mockRepo,
      mockOrder,
      mockAppointment,
      mockService,
      mockUser,
      mockRide,
      mockRecurrence,
      mockFidelity,
      mockClient
    );
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
  it("should call incrementAppointmentsTotal of user method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockUser.incrementAppointmentsTotal).toHaveBeenCalledWith({
      fields: { _id: fakeRequestEntity?.ownerId },
      options: {},
    });
    expect(mockUser.incrementAppointmentsTotal).toHaveBeenCalledTimes(3);
  });
  it("should call incrementAppointmentsTotal of service method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockService.incrementAppointmentsTotal).toHaveBeenCalledWith({
      fields: { _id: fakeRequestEntity?.serviceId },
      options: {},
    });
    expect(mockService.incrementAppointmentsTotal).toHaveBeenCalledTimes(1);
  });
  it("should call incrementAppointmentsTotal of client method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity?._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockClient.incrementAppointmentsTotal).toHaveBeenCalledWith({
      fields: { _id: fakeRequestEntity?.clientId },
      options: {},
    });
    expect(mockClient.incrementAppointmentsTotal).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not increment appointment after call incrementAppointmentsTotal of serviceRepository", async () => {
    mockService.incrementAppointmentsTotal.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao incrementar o total de agendamentos da tabela service");
  });
  it("Should throws if was not increment appointment after call incrementAppointmentsTotal of clientRepository", async () => {
    mockClient.incrementAppointmentsTotal.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela client para client"
    );
  });
  it("Should throws if was not increment appointment after first call incrementAppointmentsTotal of userRepository", async () => {
    mockUser.incrementAppointmentsTotal.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela user para professional"
    );
  });
  it("Should throws if was not increment appointment after second call incrementAppointmentsTotal of userRepository", async () => {
    mockUser.incrementAppointmentsTotal
      .mockResolvedValueOnce(fakeUserEntity)
      .mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela user para owner"
    );
  });
  it("Should throws if was not increment appointment after third call incrementAppointmentsTotal of userRepository", async () => {
    mockUser.incrementAppointmentsTotal
      .mockResolvedValueOnce(fakeUserEntity)
      .mockResolvedValueOnce(fakeUserEntity)
      .mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow(
      "Erro ao incrementar o total de agendamentos da tabela user para client"
    );
  });
  it("Should throws if was not add order after call addOrder of orderRepository", async () => {
    mockOrder.addOrder.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível criar o pedido");
  });
  test("should call mockOrder.addOrder method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockOrder.addOrder).toHaveBeenCalledWith({
      name: "pedidoEfetivado",
      createdById: fakeRequestEntity?.createdById,
      createdAt: new Date(),
      percentageAdopted: fakeRequestEntity?.order?.percentageAdopted,
      paymentForm: fakeRequestEntity?.order?.paymentForm,
      orderPaidByClient: fakeRequestEntity?.order?.orderPaidByClient,
      comissionPaidByOwner: fakeRequestEntity?.order?.comissionPaidByOwner,
      comissionValue: fakeRequestEntity?.order?.comissionValue,
      totalValue: fakeRequestEntity?.order?.totalValue,
      ownerId: fakeRequestEntity?.ownerId,
      clientId: fakeRequestEntity?.clientId,
      extraCost: fakeRequestEntity?.order?.extraCost,
      normalCost: fakeRequestEntity?.order?.normalCost,
      haveFidelity: fakeRequestEntity?.haveFidelity,
      haveDelivery: fakeRequestEntity?.haveDelivery,
      professionalId: fakeRequestEntity?.professionalId,
      pointsUsed: fakeRequestEntity?.order?.pointsUsed,
      appointmentDate: fakeRequestEntity?.order?.appointmentDate,
      updatedAt: new Date(),
      active: true,
    });
    expect(mockOrder.addOrder).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not add recurrence after call addRecurrence of recurrenceRepository when status updated is 0", async () => {
    mockRecurrence.addRecurrence.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 0,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Não foi possível criar a recorrência");
  });
  it("Should throws if was not add recurrence after call addRecurrence of recurrenceRepository when status updated is 6", async () => {
    mockRecurrence.addRecurrence.mockResolvedValueOnce(null);
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
    ).rejects.toThrow("Não foi possível criar a recorrência");
  });
  it("Should throws if was not add ride after call addride of rideRepository when status updated is 1", async () => {
    mockRide.addRide.mockResolvedValueOnce(null);
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
    ).rejects.toThrow("Não foi possível criar a corrida");
  });
  it("Should throws if was not add ride after call addride of rideRepository when status updated is 7", async () => {
    mockRide.addRide.mockResolvedValueOnce(null);
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
    ).rejects.toThrow("Não foi possível criar a corrida");
  });
  it("Should throws if was not add appointment after call addappointment of appointmentRepository when status updated is 1", async () => {
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
  it("Should throws if was not add Appointment after call addAppointment of AppointmentRepository when status updated is 7", async () => {
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

  it("Should throws if was not add appointment after call updateAppointment of appointmentRepository when status updated is 2", async () => {
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
  it("Should throws if was not add Appointment after call updateAppointment of AppointmentRepository when status updated is 3", async () => {
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
  it("Should throws if was not add appointment after call updateAppointment of appointmentRepository when status updated is 5", async () => {
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
  it("Should throws if was not add Appointment after call updateAppointment of AppointmentRepository when status updated is 6", async () => {
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
  it("Should throws if was not add fidelity after call addfidelity of fidelityRepository", async () => {
    mockFidelity.addFidelity.mockResolvedValueOnce(null);
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao adicionar os pontos de fidelidade pro cliente");
  });
  test("should call mockFidelity.addFidelity method with correct values", async () => {
    await testInstance.updateRequestById(fakeRequestEntity._id, {
      ...fakeRequestEntity,
      status: 10,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(mockFidelity.addFidelity).toHaveBeenCalledWith({
      active: true,
      ownerId: fakeRequestEntity?.ownerId,
      points: fakeRequestEntity?.fidelity?.points,
      clientId: fakeRequestEntity?.clientId,
      name: fakeRequestEntity?.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdById: fakeRequestEntity?.createdById,
    });
    expect(mockFidelity.addFidelity).toHaveBeenCalledTimes(1);
  });
  it("Should throws if was not add fidelity after call addfidelity of fidelityRepository STATUS===11", async () => {
    mockFidelity.addFidelity.mockResolvedValueOnce(null);
    mockRepo.updateRequest.mockResolvedValueOnce({
      ...fakeRequestEntity,
      status: 11,
      initDate: subMinutes(new Date(), 4000).toISOString(),
    });
    expect(
      testInstance.updateRequestById(fakeRequestEntity._id, {
        ...fakeRequestEntity,
        status: 10,
        initDate: subMinutes(new Date(), 4000).toISOString(),
      })
    ).rejects.toThrow("Erro ao adicionar os pontos de fidelidade pro cliente");
  });
  test("should call mockAppointment.addAppointment method with correct values", async () => {
    const newfakeRequestEntity = { ...fakeRequestEntity, status: 7 };
    mockRepo.updateRequest.mockResolvedValueOnce(newfakeRequestEntity);
    await testInstance.updateRequestById("123", fakeRequestEntity);
    expect(mockAppointment.addAppointment).toHaveBeenCalledWith({
      requestId: "123",
      name: "agendamentoCriado",
      message: "mensagem",
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
  test("should call mockRecurrence.addRecurrence method with correct values", async () => {
    const newfakeRequestEntity = { ...fakeRequestEntity, status: 6 };
    mockRepo.updateRequest.mockResolvedValueOnce(newfakeRequestEntity);
    await testInstance.updateRequestById("123", fakeRequestEntity);
    expect(mockRecurrence.addRecurrence).toHaveBeenCalledWith({
      createdAt: new Date(),
      type: fakeRequestEntity?.recurrence?.type,
      createdById: fakeRequestEntity?.createdById,
      accept: false,
      appointmentsWasInserted: false,
      initDate: fakeRequestEntity?.initDate,
      endDate: fakeRequestEntity?.endDate,
      professionalId: fakeRequestEntity?.professionalId,
      clientId: fakeRequestEntity?.clientId,
      serviceId: fakeRequestEntity?.serviceId,
      ownerId: fakeRequestEntity?.ownerId,
      frequency: fakeRequestEntity?.recurrence?.frequency,
      requestId: "123",
      name: "recorrenciaCriada",
      updatedAt: new Date(),
      active: true,
    });
    expect(mockRecurrence.addRecurrence).toHaveBeenCalledTimes(1);
  });
  test("should call mockRide.addRide method with correct values", async () => {
    const newfakeRequestEntity = { ...fakeRequestEntity, status: 1 };
    mockRepo.updateRequest.mockResolvedValueOnce(newfakeRequestEntity);
    await testInstance.updateRequestById("123", fakeRequestEntity);
    expect(mockRide.addRide).toHaveBeenCalledWith({
      createdAt: new Date(),
      name: "corridaCriada",
      createdById: fakeRequestEntity?.createdById,
      driverUserType: fakeRequestEntity?.ride?.driverUserType,
      origin: fakeRequestEntity?.ride?.origin,
      destiny: fakeRequestEntity?.ride?.destiny,
      distance: fakeRequestEntity?.ride?.distance,
      distanceTime: fakeRequestEntity?.ride?.distanceTime,
      maxCostEstimated: fakeRequestEntity?.ride?.maxCostEstimated,
      minCostEstimated: fakeRequestEntity?.ride?.minCostEstimated,
      finalCost: fakeRequestEntity?.ride?.finalCost,
      costDefinedByOwner: fakeRequestEntity?.ride?.costDefinedByOwner,
      initDate: fakeRequestEntity?.ride?.initDate,
      endDateEstimated: fakeRequestEntity?.ride?.endDateEstimated,
      endDate: fakeRequestEntity?.ride?.endDate,
      status: 0,
      requestId: "123",
      updatedAt: new Date(),
      active: true,
    });
    expect(mockRide.addRide).toHaveBeenCalledTimes(1);
  });
});
