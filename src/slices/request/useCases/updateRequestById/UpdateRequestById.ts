import { RequestData } from "@/slices/request/entities";
import { IUpdateRequestById } from "./contracts";
import { AddOrderRepository } from "@/slices/order/repositories";
import {
    AddAppointmentRepository,
    LoadAppointmentRepository,
    UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { AddRideRepository } from "@/slices/ride/repositories";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { UpdateUserRepository } from "@/slices/user/repositories";
import {
    UpdateRequestRepository,
    LoadRequestRepository,
} from "@/slices/request/repositories";
import { UpdateClientRepository } from "@/slices/client/repositories";
import { statusIsValid } from "@/slices/request/validators/status/status";
import {
    AppointmentHandler,
    FidelityHandler,
    OrderHandler,
    RecurrenceHandler,
    RideHandler,
} from "./handlers";

export class UpdateRequestById implements IUpdateRequestById {
    constructor(
        private readonly requestRepository: UpdateRequestRepository &
            LoadRequestRepository,
        private readonly orderRepository: AddOrderRepository,
        private readonly appointmentRepository: AddAppointmentRepository &
            LoadAppointmentRepository &
            UpdateAppointmentRepository,
        private readonly serviceRepository: UpdateServiceRepository,
        private readonly userRepository: UpdateUserRepository,
        private readonly rideRepository: AddRideRepository,
        private readonly recurrenceRepository: AddRecurrenceRepository,
        private readonly fidelityRepository: AddFidelityRepository,
        private readonly clientRepository: UpdateClientRepository
    ) {}

    async updateRequestById(id: string, data: RequestData): Promise<any> {
        if (data && id) {
            const request = await this.requestRepository.loadRequest({
                fields: { _id: id },
                options: {},
            });
            if (
                request &&
                statusIsValid({ currentRequest: request, newStatus: data?.status })
            ) {
                const requestUpdated = await this.requestRepository.updateRequest(
                    {
                        fields: { _id: id },
                        options: {},
                    },
                    data
                );
                if (requestUpdated) {
                    const appointmentHandler = new AppointmentHandler(
                        this.appointmentRepository
                    );
                    const orderHandler = new OrderHandler(
                        this.orderRepository,
                        this.serviceRepository,
                        this.userRepository,
                        this.clientRepository
                    );
                    const rideHandler = new RideHandler(this.rideRepository);
                    const recurrenceHandler = new RecurrenceHandler(
                        this.recurrenceRepository
                    );
                    const fidelityHandler = new FidelityHandler(this.fidelityRepository);
                    appointmentHandler
                        .setNext(orderHandler)
                        .setNext(rideHandler)
                        .setNext(recurrenceHandler)
                        .setNext(fidelityHandler);
                    await appointmentHandler.handle(requestUpdated);
                    return requestUpdated;
                }
            }
        }
        throw new Error("Erro ao atualizar a solicitação");
    }
}
