import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { AbstractHandler } from "../contracts";

export class RecurrenceHandler extends AbstractHandler {
  constructor(private readonly recurrenceRepository: AddRecurrenceRepository) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (
      request?.haveRecurrence === true &&
      (request?.status === 0 || request?.status === 6)
    ) {
      const recurrenceCreated = await this.recurrenceRepository.addRecurrence({
        requestId: request?._id,
        name: "recorrenciaCriada",
        serviceId: request?.serviceId,
        ownerId: request?.ownerId,
        professionalId: request?.professionalId,
        clientId: request?.clientId,
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
        initDate: request?.initDate,
        endDate: request?.endDate,
        type: request?.recurrence?.type,
        accept: false,
        appointmentsWasInserted: false,
        frequency: request?.recurrence?.frequency,
      });
      if (!recurrenceCreated) {
        throw new Error("Não foi possível criar a recorrência");
      }
    }
    return super.handle(request);
  }
}
