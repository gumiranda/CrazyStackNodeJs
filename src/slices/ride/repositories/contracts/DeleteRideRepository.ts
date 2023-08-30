import { Query } from "@/application/types";
import { RideData } from "@/slices/ride/entities";

export interface DeleteRideRepository {
  deleteRide(query: Query): Promise<RideData | null>;
}
