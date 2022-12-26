import { LoadServiceRepository } from "@/slices/service/repositories";
import { ServiceData } from "@/slices/service/entities";
import { Query } from "@/application/types";

export type LoadService = (query: Query) => Promise<ServiceData | null>;
export type LoadServiceSignature = (loadService: LoadServiceRepository) => LoadService;
export const loadService: LoadServiceSignature =
    (loadServiceRepository: LoadServiceRepository) => async (query: Query) => {
        return loadServiceRepository.loadService(query);
    };
