import { LoadRideRepository } from "@/slices/ride/repositories";
import { RideData } from "@/slices/ride/entities";
import { Query } from "@/application/types";

export type LoadRide = (query: Query) => Promise<RideData | null>;
export type LoadRideSignature = (loadRide: LoadRideRepository) => LoadRide;
export const loadRide: LoadRideSignature =
    (loadRideRepository: LoadRideRepository) => async (query: Query) => {
        return loadRideRepository.loadRide(query);
    };
