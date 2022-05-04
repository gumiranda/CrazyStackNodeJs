import { ServiceData } from "@/slices/service/entities";

export interface AddServiceRepository {
    addService(service: ServiceData): Promise<ServiceData | null>;
}
