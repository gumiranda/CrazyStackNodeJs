import { Query } from "@/application/types";
import { AppointmentData } from "@/slices/appointment/entities";

export interface UpdateAppointmentRepository {
  updateAppointment(query: Query, data: AppointmentData): Promise<AppointmentData | null>;
}
