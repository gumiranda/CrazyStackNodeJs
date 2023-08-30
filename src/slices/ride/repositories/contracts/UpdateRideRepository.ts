import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";

export interface UpdateRideRepository {
  updateRide(query: Query, data: RideData): Promise<RideData | null>;
}
