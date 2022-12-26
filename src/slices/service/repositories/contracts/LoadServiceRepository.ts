import { Query } from "@/application/types";
import { ServiceData } from "@/slices/service/entities";

export interface LoadServiceRepository {
    loadService(query: Query): Promise<ServiceData | null>;
}
