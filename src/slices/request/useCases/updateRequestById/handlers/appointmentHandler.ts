import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { AbstractHandler } from "../contracts";

export class AppointmentHandler extends AbstractHandler {
  constructor(
    private readonly appointmentRepository: AddAppointmentRepository &
      LoadAppointmentRepository &
      UpdateAppointmentRepository
  ) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (request?.status === 1 || request?.status === 7) {
      const appointmentCreated = await this.appointmentRepository.addAppointment({
        requestId: request?._id,
        name: "agendamentoCriado",
        message: "mensagem",
        serviceId: request?.serviceId,
        ownerId: request?.ownerId,
        professionalId: request?.professionalId,
        clientId: request?.clientId,
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 1,
        active: true,
        read: false,
        push: false,
        email: false,
        initDate: request?.initDate,
        endDate: request?.endDate,
        cancelled: false,
      });
      if (!appointmentCreated) {
        throw new Error("Não foi possível criar o agendamento");
      }
    } else if (
      request?.status === 5 ||
      request?.status === 6 ||
      request?.status === 2 ||
      request?.status === 3
    ) {
      const appointmentFound = await this.appointmentRepository.loadAppointment({
        fields: { _id: request?._id },
        options: {},
      });
      if (!!appointmentFound?._id) {
        const appointmentUpdated = await this.appointmentRepository.updateAppointment(
          {
            fields: { _id: appointmentFound?._id },
          },
          {
            ...appointmentFound,
            cancelledAt: new Date(),
            updatedAt: new Date(),
            cancelled: true,
            active: false,
            cancelledBy: request?.createdById,
          }
        );
        if (!appointmentUpdated) {
          throw new Error("Não foi possível cancelar o agendamento");
        }
      }
    }
    return super.handle(request);
  }
}
