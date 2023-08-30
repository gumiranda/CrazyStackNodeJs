import { Repository } from "@/application/infra/contracts/repository";
import {
  AppointmentData,
  AppointmentPaginated,
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
import {
  AddAppointmentRepository,
  DeleteAppointmentRepository,
  LoadAppointmentByPageRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
  LoadAvailableTimesRepository,
} from "./contracts";
import { Query } from "@/application/types";
import { QueryBuilder } from "@/application/helpers/utils/queryBuilder";
import { ObjectId } from "mongodb";
export class AppointmentRepository
  implements
    AddAppointmentRepository,
    DeleteAppointmentRepository,
    LoadAppointmentByPageRepository,
    LoadAppointmentRepository,
    UpdateAppointmentRepository,
    LoadAvailableTimesRepository
{
  constructor(private readonly repository: Repository) {}
  async loadAvailableTimes(
    query: QueryAvailableTimesRepository
  ): Promise<AvailableTimesModelRepository | null> {
    if (!query?.professionalId || !query?.initDay || !query?.endDay) {
      return null;
    }
    const queryBuilded = new QueryBuilder()
      .match({
        professionalId: new ObjectId(query.professionalId),
        initDate: { $lte: query?.endDay, $gte: query?.initDay },
        endDate: { $lte: query?.endDay, $gte: query?.initDay },
        cancelled: false,
        active: true,
      })
      .sort({ initDate: 1 })
      .lookup({
        from: "user",
        localField: "professionalId",
        foreignField: "_id",
        as: "professionalDetails",
      })
      .project({ initDate: 1, endDate: 1, professionalDetails: { ownerId: 1 } })
      .unwind({ path: "$professionalDetails" })
      .lookup({
        from: "owner",
        localField: "professionalDetails.ownerId",
        foreignField: "_id",
        as: "owner",
      })
      .project({
        initDate: 1,
        endDate: 1,
        owner: {
          days1: 1,
          hourStart1: 1,
          hourEnd1: 1,
          hourLunchEnd1: 1,
          hourLunchStart1: 1,
          days2: 1,
          hourStart2: 1,
          hourEnd2: 1,
          hourLunchEnd2: 1,
          hourLunchStart2: 1,
          days3: 1,
          hourStart3: 1,
          hourEnd3: 1,
          hourLunchEnd3: 1,
          hourLunchStart3: 1,
        },
      })
      .unwind({ path: "$owner" })
      .group({ _id: "$owner", data: { $push: "$$ROOT" } })
      .project({ _id: 1, data: { initDate: 1, endDate: 1 } })
      .build();
    const appointments = await this.repository.aggregate(queryBuilded);
    if (appointments?.length > 0 && appointments?.[0]?._id && appointments?.[0]?.data) {
      return { _id: appointments?.[0]?._id, data: appointments?.[0]?.data };
    }
    return null;
  }
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
  async updateAppointment(
    query: Query,
    data: AppointmentData
  ): Promise<AppointmentData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
