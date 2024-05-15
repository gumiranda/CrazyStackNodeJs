import { LoadAvailableTimesRepository, LoadInvoiceRepository } from "../contracts";
import {
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
} from "../../entities";
import { QueryBuilder } from "@/application/helpers";
import { ObjectId } from "mongodb";
import { mapQueryParamsToQueryMongo, MongoRepository } from "@/application/infra";
import { Query } from "@/application/types";

export class AppointmentAggregateRepository
  implements LoadAvailableTimesRepository, LoadInvoiceRepository
{
  constructor(private readonly repository: MongoRepository) {}
  async loadInvoice(query: Query): Promise<any> {
    if (!query?.fields?.initDate || !query?.fields?.endDate) {
      return null;
    }
    const queryBuilded = new QueryBuilder()
      .match(
        mapQueryParamsToQueryMongo({
          initDate: { $gte: query?.fields?.initDate },
          endDate: { $lte: query?.fields?.endDate },
          cancelled: false,
          active: true,
          ...query?.fields,
        })
      )
      .lookup({
        from: "service",
        localField: "serviceId",
        foreignField: "_id",
        as: "serviceInfo",
      })
      .unwind({ path: "$serviceInfo" })
      .group({ _id: "$serviceInfo", total: { $sum: "$serviceInfo.price" } })
      .build();
    const appointments = await this.repository.aggregate(queryBuilded);
    return { appointments };
  }
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
}
