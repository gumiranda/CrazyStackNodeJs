import { Query } from "@/application/types";
import { RequestData } from "@/slices/request/entities";

export interface LoadRequestRepository {
    loadRequest(query: Query): Promise<RequestData | null>;
}
