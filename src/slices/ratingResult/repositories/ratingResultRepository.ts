import { Repository } from "@/application/infra/contracts/repository";
import {
  RatingResultAverage,
  RatingResultData,
  RatingResultPaginated,
} from "@/slices/ratingResult/entities";
import {
  AddRatingResultRepository,
  DeleteRatingResultRepository,
  LoadRatingResultByPageRepository,
  LoadRatingResultRepository,
  UpdateRatingResultRepository,
  LoadAverageRatingResultRepository,
} from "./contracts";
import { Query } from "@/application/types";
import { QueryBuilder } from "@/application/helpers/utils/queryBuilder";
import { mapAnyToMongoObject } from "@/application/infra/database/mongodb";
export class RatingResultRepository
  implements
    AddRatingResultRepository,
    DeleteRatingResultRepository,
    LoadRatingResultByPageRepository,
    LoadRatingResultRepository,
    UpdateRatingResultRepository,
    LoadAverageRatingResultRepository
{
  constructor(private readonly repository: Repository) {}
  async loadAverageRatingResult(query: Query): Promise<RatingResultAverage | null> {
    if (!query?.fields) {
      return null;
    }
    const queryRatingAverage = new QueryBuilder()
      .match(mapAnyToMongoObject(query?.fields))
      .group({ _id: 0, data: { $push: "$$ROOT" }, total: { $sum: 1 } })
      .unwind({ path: "$data" })
      .lookup({
        from: "rating",
        foreignField: "_id",
        localField: "data.ratingId",
        as: "rating",
      })
      .unwind({ path: "$rating" })
      .group({
        _id: {
          ratingId: "$rating._id",
          ratingType: "$rating.ratingType",
          createdAt: "$rating.createdAt",
          total: "$total",
          rating: "$data.rating",
          ratingForId: "$data.ratingForId",
          ratings: "$rating.ratings",
        },
        comments: {
          $push: {
            rating: "$data.rating",
            comment: "$data.comment",
            createdBy: "$data.createdBy",
          },
        },
        count: {
          $sum: 1,
        },
      })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        comments: "$comments",
        ratingForId: "$_id.ratingForId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        ratings: {
          $map: {
            input: "$_id.ratings",
            as: "item",
            in: {
              $mergeObjects: [
                "$$item",
                {
                  count: {
                    $cond: {
                      if: { $eq: ["$$item.rating", "$_id.rating"] },
                      then: "$count",
                      else: 0,
                    },
                  },
                  starsAvg: {
                    $cond: {
                      if: {
                        $eq: ["$$item.rating", "$_id.rating"],
                      },
                      then: {
                        $divide: [{ $multiply: ["$count", "$$item.stars"] }, "$_id.total"],
                      },
                      else: 0,
                    },
                  },
                  percent: {
                    $cond: {
                      if: { $eq: ["$$item.rating", "$_id.rating"] },
                      then: { $multiply: [{ $divide: ["$count", "$_id.total"] }, 100] },
                      else: 0,
                    },
                  },
                },
              ],
            },
          },
        },
      })
      .group({
        _id: {
          ratingId: "$ratingId",
          comments: "$comments",
          ratingType: "$ratingType",
          createdAt: "$createdAt",
        },
        ratings: {
          $push: "$ratings",
        },
      })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        comments: "$_id.comments",
        ratings: {
          $reduce: {
            input: "$ratings",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      })
      .unwind({ path: "$ratings" })
      .group({
        _id: {
          ratingId: "$ratingId",
          comments: "$comments",
          ratingType: "$ratingType",
          createdAt: "$createdAt",
          rating: "$ratings.rating",
          stars: "$ratings.stars",
        },
        count: {
          $sum: "$ratings.count",
        },
        percent: {
          $sum: "$ratings.percent",
        },
        starsAvg: {
          $sum: "$ratings.starsAvg",
        },
      })
      .match({ count: { $gt: 0 } })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        comments: "$_id.comments",
        rating: {
          rating: "$_id.rating",
          stars: "$_id.stars",
          comments: "$_id.comments",
          count: "$count",
          percent: "$percent",
          starsAvg: { $sum: "$starsAvg" },
        },
      })
      .sort({ "rating.count": -1 })
      .group({
        _id: { ratingId: "$ratingId", ratingType: "$ratingType", createdAt: "$createdAt" },
        ratings: { $push: "$rating" },
      })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        ratings: "$ratings",
        starsAvg: {
          $reduce: {
            input: "$ratings.starsAvg",
            initialValue: 0,
            in: { $sum: ["$$value", "$$this"] },
          },
        },
      })
      .build();
    const ratingResult = await this.repository.aggregate(queryRatingAverage);
    return ratingResult?.[0];
  }
  async addRatingResult(ratingResult: RatingResultData): Promise<RatingResultData | null> {
    return this.repository.add(ratingResult);
  }
  async deleteRatingResult(query: Query): Promise<RatingResultData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadRatingResultByPage(query: Query): Promise<RatingResultPaginated | null> {
    const ratingResults = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { ratingResults, total };
  }
  async loadRatingResult(query: Query): Promise<RatingResultData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateRatingResult(
    query: Query,
    data: RatingResultData
  ): Promise<RatingResultData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
