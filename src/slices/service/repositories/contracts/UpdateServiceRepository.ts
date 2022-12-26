import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";

export interface UpdateServiceRepository {
    updateService(query: Query, data: ServiceData): Promise<ServiceData | null>;
    incrementAppointmentsTotal(query: Query): Promise<ServiceData | null>;
}
