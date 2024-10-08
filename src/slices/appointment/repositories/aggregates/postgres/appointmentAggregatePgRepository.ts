/* eslint-disable quotes */
import { Query } from "@/application/types";
import { LoadAvailableTimesRepository, LoadInvoiceRepository } from "../../contracts";
import {
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";
import { SQLQueryBuilder } from "@/application/helpers/utils";
import { PostgresRepository } from "@/application/infra/database/postgres/repository/pg-repository";
import { subHours } from "@/application/helpers";
import { env } from "@/application/infra";

export class AppointmentAggregatePgRepository
  implements LoadAvailableTimesRepository, LoadInvoiceRepository
{
  constructor(private readonly repository: PostgresRepository) {}
  async loadInvoice(query: Query): Promise<any> {
    if (!query?.fields?.initDate || !query?.fields?.endDate) {
      return null;
    }
    const subQuery = new SQLQueryBuilder("appointment")
      .project(
        `"appointment"."_id",
      "appointment"."initDate",
      "appointment"."endDate",
      "appointment"."serviceId",
      SUM(service.price) as total_price`
      )
      .join({
        table: "service",
        on: '"appointment"."serviceId" = "service"."_id"',
      })
      .match(`"appointment"."initDate" >= $1 AND "appointment"."endDate" <= $2`)
      .group({
        _id: '"appointment"."_id", "appointment"."initDate", "appointment"."endDate", "appointment"."serviceId"',
      })
      .addValue(query.fields.initDate)
      .addValue(query.fields.endDate)
      .build();
    const queryBuilded = new SQLQueryBuilder("appointment")
      .projectSubQuery(
        'SUM(subquery."total_price") as "grand_total"',
        subQuery.text,
        "subquery"
      )
      .addValue(query.fields.initDate)
      .addValue(query.fields.endDate)
      .build();
    const [total, result] = await Promise.all([
      this.repository.aggregate(queryBuilded),
      this.repository.aggregate(subQuery),
    ]);
    return { appointments: result, total: total?.[0]?.grand_total ?? 0 };
  }
  async loadAvailableTimes(
    query: QueryAvailableTimesRepository
  ): Promise<AvailableTimesModelRepository | null> {
    if (!query?.professionalId || !query?.initDay || !query?.endDay) {
      return null;
    }
    const builder = new SQLQueryBuilder("appointment");
    const queryBuilded = builder
      .project("*")
      .join({
        table: "users",
        on: '"appointment"."professionalId" = "users"._id',
      })
      .join({
        table: "owner",
        on: '"users"."ownerId" = "owner"._id',
      })
      .match(
        `"professionalId" = $1 AND "initDate" <= $2 AND "initDate" >= $3 AND "endDate" <= $4 AND "endDate" >= $5 AND "appointment".cancelled = false AND "appointment".active = true`
      )
      .addValue(query.professionalId)
      .addValue(query.endDay)
      .addValue(query.initDay)
      .addValue(query.endDay)
      .addValue(query.initDay)
      .sort({ initDate: 1 })
      .build();
    const result = await this.repository.aggregate(queryBuilded);
    if (result?.[0]?._id) {
      const appointments = result?.map?.((item: any) => ({
        ...item,
        initDate: handleTimezone(item.initDate),
        endDate: handleTimezone(item.endDate),
      }));
      return { _id: appointments?.[0], data: appointments };
    }
    return null;
  }
}
const handleTimezone = (date: any) => {
  if (env.FUSORARIOBR === "production") {
    return subHours(date, 3).toISOString();
  }
  return date.toISOString();
};
