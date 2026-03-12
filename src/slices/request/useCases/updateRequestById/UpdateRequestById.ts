import { RequestData } from "@/slices/request/entities";
import { IUpdateRequestById } from "./contracts";
import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import {
  UpdateRequestRepository,
  LoadRequestRepository,
} from "@/slices/request/repositories";
import { statusIsValid } from "@/slices/request/validators/status/status";
import { AppointmentHandler } from "./handlers";

export class UpdateRequestById implements IUpdateRequestById {
  constructor(
    private readonly requestRepository: UpdateRequestRepository & LoadRequestRepository,
    private readonly appointmentRepository: AddAppointmentRepository &
      LoadAppointmentRepository &
      UpdateAppointmentRepository
  ) {}

  async updateRequestById(id: string, data: RequestData): Promise<any> {
    if (data && id) {
      const request = await this.requestRepository.loadRequest({
        fields: { _id: id },
        options: {},
      });
      if (request && statusIsValid({ currentRequest: request, newStatus: data?.status })) {
        const requestUpdated = await this.requestRepository.updateRequest(
          {
            fields: { _id: id },
            options: {},
          },
          data
        );
        if (requestUpdated) {
          const appointmentHandler = new AppointmentHandler(this.appointmentRepository);
          await appointmentHandler.handle(requestUpdated);
          return requestUpdated;
        }
      }
    }
    throw new Error("Erro ao atualizar a solicitação");
  }
}
