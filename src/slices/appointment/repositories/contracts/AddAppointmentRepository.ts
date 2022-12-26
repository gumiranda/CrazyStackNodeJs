import { AppointmentData } from "@/slices/appointment/entities";

export interface AddAppointmentRepository {
    addAppointment(appointment: AppointmentData): Promise<AppointmentData | null>;
}
