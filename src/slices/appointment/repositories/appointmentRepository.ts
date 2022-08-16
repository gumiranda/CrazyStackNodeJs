import { Repository } from "@/application/infra/contracts/repository";
import { AppointmentData, AppointmentPaginated } from "@/slices/appointment/entities";
import {
    AddAppointmentRepository,
    DeleteAppointmentRepository,
    LoadAppointmentByPageRepository,
    LoadAppointmentRepository,
    UpdateAppointmentRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class AppointmentRepository
    implements
        AddAppointmentRepository,
        DeleteAppointmentRepository,
        LoadAppointmentByPageRepository,
        LoadAppointmentRepository,
        UpdateAppointmentRepository
{
    constructor(private readonly repository: Repository) {}
    async addAppointment(appointment: AppointmentData): Promise<AppointmentData | null> {
        return this.repository.add(appointment);
    }
    async deleteAppointment(query: Query): Promise<AppointmentData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadAppointmentByPage(query: Query): Promise<AppointmentPaginated | null> {
        const appointments = await this.repository.getPaginate(
            query?.options?.page ?? 0,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { appointments, total };
    }
    async loadAppointment(query: Query): Promise<AppointmentData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updateAppointment(query: Query, data: AppointmentData): Promise<AppointmentData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}
