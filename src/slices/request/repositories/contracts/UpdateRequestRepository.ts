import { Query } from "@/application/types";
import { RequestData } from "@/slices/request/entities";

export interface UpdateRequestRepository {
    updateRequest(query: Query, data: RequestData): Promise<RequestData | null>;
}
