import { AddServiceRepository } from "@/slices/service/repositories";
import { ServiceEntity, ServiceData } from "@/slices/service/entities";

export type AddService = (data: ServiceData) => Promise<ServiceEntity | null>;
export type AddServiceSignature = (addService: AddServiceRepository) => AddService;
export const addService: AddServiceSignature =
    (addServiceRepository: AddServiceRepository) => (data: ServiceData) => {
        return addServiceRepository.addService(new ServiceEntity(data));
    };
