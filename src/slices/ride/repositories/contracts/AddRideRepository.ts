import { RideData } from "@/slices/ride/entities";

export interface AddRideRepository {
    addRide(ride: RideData): Promise<RideData | null>;
}
