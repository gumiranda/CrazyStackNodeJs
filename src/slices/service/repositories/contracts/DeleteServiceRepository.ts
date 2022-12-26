import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";

export interface DeleteServiceRepository {
    deleteService(query: Query): Promise<ServiceData | null>;
}
