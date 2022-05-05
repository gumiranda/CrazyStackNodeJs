import { RequestData } from "@/slices/request/entities";

export interface AddRequestRepository {
    addRequest(request: RequestData): Promise<RequestData | null>;
}
