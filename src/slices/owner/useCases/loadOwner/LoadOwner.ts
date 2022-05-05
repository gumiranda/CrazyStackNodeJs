import { LoadOwnerRepository } from "@/slices/owner/repositories";
import { OwnerData } from "@/slices/owner/entities";
import { Query } from "@/application/types";

export type LoadOwner = (query: Query) => Promise<OwnerData | null>;
export type LoadOwnerSignature = (loadOwner: LoadOwnerRepository) => LoadOwner;
export const loadOwner: LoadOwnerSignature =
    (loadOwnerRepository: LoadOwnerRepository) => async (query: Query) => {
        return loadOwnerRepository.loadOwner(query);
    };
