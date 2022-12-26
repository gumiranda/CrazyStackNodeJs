import { Query } from "@/application/types";
import { AppointmentPaginated } from "@/slices/appointment/entities";

export interface LoadAppointmentByPageRepository {
    loadAppointmentByPage(query: Query): Promise<AppointmentPaginated | null>;
}
