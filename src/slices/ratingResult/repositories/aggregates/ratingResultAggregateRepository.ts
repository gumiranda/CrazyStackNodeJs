import { RatingResultAverage } from "../../entities";
import { QueryBuilder } from "@/application/helpers";
import { mapAnyToMongoObject, MongoRepository } from "@/application/infra";
import { Query } from "@/application/types";
import { LoadAverageRatingResultRepository } from "../contracts";

export class RatingResultAggregateRepository implements LoadAverageRatingResultRepository {
  constructor(private readonly repository: MongoRepository) {}
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
}
