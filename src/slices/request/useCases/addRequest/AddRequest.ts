import { AddRequestRepository } from "@/slices/request/repositories";
import { RequestEntity, RequestData } from "@/slices/request/entities";

export type AddRequest = (data: RequestData) => Promise<RequestEntity | null>;
export type AddRequestSignature = (addRequest: AddRequestRepository) => AddRequest;
export const addRequest: AddRequestSignature =
    (addRequestRepository: AddRequestRepository) => (data: RequestData) => {
        return addRequestRepository.addRequest(new RequestEntity(data));
    };
