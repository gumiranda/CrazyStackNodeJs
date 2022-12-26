import { Query } from "@/application/types";
import { ServicePaginated } from "@/slices/service/entities";

export interface LoadServiceByPageRepository {
    loadServiceByPage(query: Query): Promise<ServicePaginated | null>;
}
