import { LoadAppointmentByPageRepository } from "@/slices/appointment/repositories";
import { AppointmentPaginated } from "@/slices/appointment/entities";
import { Query } from "@/application/types";

export type LoadAppointmentByPage = (query: Query) => Promise<AppointmentPaginated | null>;
export type LoadAppointmentByPageSignature = (
    loadAppointmentByPage: LoadAppointmentByPageRepository
) => LoadAppointmentByPage;
export const loadAppointmentByPage: LoadAppointmentByPageSignature =
    (loadAppointmentByPageRepository: LoadAppointmentByPageRepository) =>
    async (query: Query) => {
        return loadAppointmentByPageRepository.loadAppointmentByPage(query);
    };
