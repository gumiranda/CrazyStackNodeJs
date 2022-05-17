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
        expect(mockUser.incrementAppointmentsTotal).toHaveBeenCalledWith("fakeUserId");
        expect(mockUser.incrementAppointmentsTotal).toHaveBeenCalledTimes(3);
    });
    it("should call incrementAppointmentsTotal of service method with correct values", async () => {
        await testInstance.updateRequestById(fakeRequestEntity?._id, {
            ...fakeRequestEntity,
            status: 10,
            initDate: subMinutes(new Date(), 4000).toISOString(),
        });
        expect(mockService.incrementAppointmentsTotal).toHaveBeenCalledWith(
            "fakeServiceId"
        );
        expect(mockService.incrementAppointmentsTotal).toHaveBeenCalledTimes(1);
    });
    it("should call incrementAppointmentsTotal of client method with correct values", async () => {
        await testInstance.updateRequestById(fakeRequestEntity?._id, {
            ...fakeRequestEntity,
            status: 10,
            initDate: subMinutes(new Date(), 4000).toISOString(),
        });
        expect(mockClient.incrementAppointmentsTotal).toHaveBeenCalledWith("fakeUserId");
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
});
