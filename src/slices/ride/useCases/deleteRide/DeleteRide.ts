import { DeleteRideRepository } from "@/slices/ride/repositories";
import { RideData } from "@/slices/ride/entities";
import { Query } from "@/application/types";

export type DeleteRide = (query: Query) => Promise<RideData | null>;
export type DeleteRideSignature = (
    deleteRide: DeleteRideRepository
) => DeleteRide;
export const deleteRide: DeleteRideSignature =
    (deleteRideRepository: DeleteRideRepository) => (query: Query) => {
        return deleteRideRepository.deleteRide(query);
    };
