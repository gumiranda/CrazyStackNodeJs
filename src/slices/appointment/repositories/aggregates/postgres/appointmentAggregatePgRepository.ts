/* eslint-disable quotes */
import { Query } from "@/application/types";
import { LoadAvailableTimesRepository, LoadInvoiceRepository } from "../../contracts";
import {
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
import { SQLQueryBuilder } from "@/application/helpers/utils/sqlQueryBuilder";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";

export class AppointmentAggregatePgRepository
  implements LoadAvailableTimesRepository, LoadInvoiceRepository
{
  constructor(private readonly repository: PostgresRepository) {}
  async loadInvoice(query: Query): Promise<any> {
    if (!query?.fields?.initDate || !query?.fields?.endDate) {
      return null;
    }

    // Construindo a consulta SQL
    const sqlQueryBuilder = new SQLQueryBuilder();
    const queryBuilded = sqlQueryBuilder
      .match("initDate >= $1 AND endDate <= $2 AND cancelled = false AND active = true")
      .addValue(query.fields.initDate)
      .addValue(query.fields.endDate)
      .join({
        table: "service",
        alias: "serviceInfo",
        on: "serviceId = serviceInfo._id",
      })
      .group({ _id: "serviceInfo", total: "SUM(serviceInfo.price)" })
      .build();

    // Executando a consulta SQL
    const appointments = await this.repository.aggregate(queryBuilded);
    return { appointments };
  }
  async loadAvailableTimes(
    query: QueryAvailableTimesRepository
  ): Promise<AvailableTimesModelRepository | null> {
    if (!query?.professionalId || !query?.initDay || !query?.endDay) {
      return null;
    }

    const builder = new SQLQueryBuilder("appointment");
    const queryBuilded = builder
      .project(
        "'initDate' as dateinit, 'endDate', 'professionalId', 'cancelled', 'active', 'serviceId', 'createdAt', 'updatedAt'"
      )
      .match(
        "'professionalId' = $1 AND 'initDate' <= $2 AND 'initDate' >= $3 AND 'endDate' <= $4 AND 'endDate' >= $5 AND cancelled = false AND active = true"
      )
      .join({
        table: "users",
        on: '"appointment"."professionalId" = "users"._id',
      })
      .addValue(query.professionalId)
      .addValue(query.endDay)
      .addValue(query.initDay)
      .addValue(query.endDay)
      .addValue(query.initDay)
      .sort({ dateinit: 1 })

      .project("initDate, endDate, professionalDetails.ownerId")
      .join({
        table: "owner",
        alias: "owner",
        on: "professionalDetails.ownerId = owner._id",
      })
      .project(
        "initDate, endDate, owner.days1, owner.hourStart1, owner.hourEnd1, owner.hourLunchEnd1, owner.hourLunchStart1, owner.days2, owner.hourStart2, owner.hourEnd2, owner.hourLunchEnd2, owner.hourLunchStart2, owner.days3, owner.hourStart3, owner.hourEnd3, owner.hourLunchEnd3, owner.hourLunchStart3"
      )
      .group({ _id: "owner", data: "ARRAY_AGG(*)" })
      .project("_id, data.initDate, data.endDate")
      .build();
    const appointments: any = await this.repository.aggregate(queryBuilded);

    if (
      appointments &&
      appointments.length > 0 &&
      appointments[0]?._id &&
      appointments[0]?.data
    ) {
      return { _id: appointments[0]._id, data: appointments[0].data };
    }

    return null;
  }
}
