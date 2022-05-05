import { Query } from "@/application/types";
import { RequestData } from "@/slices/request/entities";

export interface DeleteRequestRepository {
    deleteRequest(query: Query): Promise<RequestData | null>;
}
