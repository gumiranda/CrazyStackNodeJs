import { AddRideRepository } from "@/slices/ride/repositories";
import { AbstractHandler } from "../contracts";

export class RideHandler extends AbstractHandler {
  constructor(private readonly rideRepository: AddRideRepository) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (
      request?.haveDelivery === true &&
      (request?.status === 1 || request?.status === 7)
    ) {
      const rideCreated = await this.rideRepository.addRide({
        requestId: request?._id,
        name: "recorrenciaCriada",
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
        initDate: request?.initDate,
        endDate: request?.endDate,
        driverUserType: request?.ride?.driverUserType,
        origin: request?.ride?.origin,
        destiny: request?.ride?.destiny,
        status: request?.ride?.status,
        distance: request?.ride?.distance,
        distanceTime: request?.ride?.distanceTime,
        maxCostEstimated: request?.ride?.maxCostEstimated,
        minCostEstimated: request?.ride?.minCostEstimated,
        finalCost: request?.ride?.finalCost,
        costDefinedByOwner: request?.ride?.costDefinedByOwner,
        endDateEstimated: request?.ride?.endDateEstimated,
      });
      if (!rideCreated) {
        throw new Error("Não foi possível criar a corrida");
      }
    }
    return super.handle(request);
  }
}
