import { AddAppointmentRepository } from "@/slices/appointment/repositories";
import { AppointmentEntity, AppointmentData } from "@/slices/appointment/entities";

export type AddAppointment = (data: AppointmentData) => Promise<AppointmentEntity | null>;
export type AddAppointmentSignature = (addAppointment: AddAppointmentRepository) => AddAppointment;
export const addAppointment: AddAppointmentSignature =
    (addAppointmentRepository: AddAppointmentRepository) => (data: AppointmentData) => {
        return addAppointmentRepository.addAppointment(new AppointmentEntity(data));
    };
