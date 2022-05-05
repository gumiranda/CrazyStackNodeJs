import { DeleteAppointmentRepository } from "@/slices/appointment/repositories";
import { AppointmentData } from "@/slices/appointment/entities";
import { Query } from "@/application/types";

export type DeleteAppointment = (query: Query) => Promise<AppointmentData | null>;
export type DeleteAppointmentSignature = (
    deleteAppointment: DeleteAppointmentRepository
) => DeleteAppointment;
export const deleteAppointment: DeleteAppointmentSignature =
    (deleteAppointmentRepository: DeleteAppointmentRepository) => (query: Query) => {
        return deleteAppointmentRepository.deleteAppointment(query);
    };
