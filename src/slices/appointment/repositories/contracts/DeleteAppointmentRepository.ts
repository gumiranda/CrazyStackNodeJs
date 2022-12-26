import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";

export interface DeleteAppointmentRepository {
    deleteAppointment(query: Query): Promise<AppointmentData | null>;
}
