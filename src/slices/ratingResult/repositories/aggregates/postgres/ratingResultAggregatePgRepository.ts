/* eslint-disable quotes */
import { PostgresRepository } from "@/application/infra";
import { Query } from "@/application/types";
import { LoadAverageRatingResultRepository } from "../../contracts";
import { RatingResultAverage } from "@/slices/ratingResult/entities";
import { SQLQueryBuilder } from "@/application/helpers";

export class RatingResultAggregatePgRepository
  implements LoadAverageRatingResultRepository
{
  constructor(private readonly repository: PostgresRepository) {}
  async loadAverageRatingResult(query: Query): Promise<RatingResultAverage | null> {
    if (!query?.fields) {
      return null;
    }
    const subQuery = new SQLQueryBuilder("ratingResult")
      .project(
        `
      "ratingResult"."ratingId",
      "ratingResult"."rating",
      "ratingResult"."comment",
      "ratingResult"."createdById",
      "rating"."ratingType",
      COUNT("ratingResult"."ratingId") as count
    `
      )
      .join({
        table: "rating",
        on: '"ratingResult"."ratingId" = "rating"."_id"',
      })
      .match('"ratingResult"."ratingForId" = $1')
      .addValue(query.fields.ratingForId)
      .group({
        _id: '"ratingResult"."createdById","ratingResult"."comment","ratingResult"."rating","ratingResult"."ratingId", "rating"."ratingType"',
      })
      .build();
    const queryBuilded = new SQLQueryBuilder("appointment")
      .projectSubQuery(
        'AVG(subquery."rating") as starsAvg, SUM(subquery.count) as "grand_total"',
        subQuery.text,
        "subquery"
      )
      .addValue(query.fields.ratingForId)
      .build();
    const [result, total] = await Promise.all([
      this.repository.aggregate(subQuery),
      this.repository.aggregate(queryBuilded),
    ]);
    return {
      ratingId: "string",
      ratingType: "ratingType",
      createdAt: new Date(),
      starsAvg: total?.[0]?.starsavg,
      ratings: result?.map?.((item: any) => ({ ...item, count: total?.[0]?.grand_total })),
    };
  }
}
