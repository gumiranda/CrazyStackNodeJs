import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";

export interface LoadAppointmentRepository {
    loadAppointment(query: Query): Promise<AppointmentData | null>;
}
