import { UpdateRequestRepository } from "@/slices/request/repositories";
import { RequestData } from "@/slices/request/entities";
import { Query } from "@/application/types";

export type UpdateRequest = (
    query: Query,
    data: RequestData
) => Promise<RequestData | null>;
export type UpdateRequestSignature = (
    updateRequest: UpdateRequestRepository
) => UpdateRequest;
export const updateRequest: UpdateRequestSignature =
    (updateRequestRepository: UpdateRequestRepository) =>
    async (query: Query, data: RequestData) => {
        return updateRequestRepository.updateRequest(query, data);
    };
