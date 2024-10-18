import { fakeRatingResultAverage } from "@/slices/ratingResult/entities/RatingResultEntity.spec";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { ObjectId } from "mongodb";
import { RatingResultAggregateRepository } from "./ratingResultAggregateRepository";
import { MongoRepository } from "@/application/infra";
const fakeRatingQuery: any = {
  fields: {
    ratingId: ObjectId.createFromTime(new Date().getTime()).toString(),
    ratingForId: ObjectId.createFromTime(new Date().getTime()).toString(),
  },
  options: {},
};
describe("RatingResult Mongo Repository", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fakeQuery: Query;
  let testInstance: RatingResultAggregateRepository;
  let repository: MockProxy<MongoRepository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<MongoRepository>();
    repository.aggregate.mockResolvedValue([fakeRatingResultAverage]);
  });
  beforeEach(async () => {
    testInstance = new RatingResultAggregateRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call aggregate of loadAverageRatingResult with correct values", async () => {
    await testInstance.loadAverageRatingResult(fakeRatingQuery);
    expect(repository.aggregate).toHaveBeenCalledTimes(1);
    expect(repository.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          ratingForId: new ObjectId(fakeRatingQuery?.fields?.ratingForId),
          ratingId: new ObjectId(fakeRatingQuery?.fields?.ratingId),
        },
      },
      {
        $group: { _id: 0, data: { $push: "$$ROOT" }, total: { $sum: 1 } },
      },
      {
        $unwind: { path: "$data" },
      },
      {
        $lookup: {
          as: "rating",
          foreignField: "_id",
          from: "rating",
          localField: "data.ratingId",
        },
      },
      { $unwind: { path: "$rating" } },
      {
        $group: {
          _id: {
            createdAt: "$rating.createdAt",
            rating: "$data.rating",
            ratingForId: "$data.ratingForId",
            ratingId: "$rating._id",
            ratingType: "$rating.ratingType",
            ratings: "$rating.ratings",
            total: "$total",
          },
          comments: {
            $push: {
              comment: "$data.comment",
              createdBy: "$data.createdBy",
              rating: "$data.rating",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
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
                        if: {
                          $eq: ["$$item.rating", "$_id.rating"],
                        },
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
                          $divide: [
                            {
                              $multiply: ["$count", "$$item.stars"],
                            },
                            "$_id.total",
                          ],
                        },
                        else: 0,
                      },
                    },
                    percent: {
                      $cond: {
                        if: {
                          $eq: ["$$item.rating", "$_id.rating"],
                        },
                        then: {
                          $multiply: [
                            {
                              $divide: ["$count", "$_id.total"],
                            },
                            100,
                          ],
                        },
                        else: 0,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: {
            comments: "$comments",
            createdAt: "$createdAt",
            ratingId: "$ratingId",
            ratingType: "$ratingType",
          },
          ratings: { $push: "$ratings" },
        },
      },
      {
        $project: {
          _id: 0,
          comments: "$_id.comments",
          createdAt: "$_id.createdAt",
          ratingId: "$_id.ratingId",
          ratingType: "$_id.ratingType",
          ratings: {
            $reduce: {
              in: { $concatArrays: ["$$value", "$$this"] },
              initialValue: [],
              input: "$ratings",
            },
          },
        },
      },
      {
        $unwind: { path: "$ratings" },
      },
      {
        $group: {
          _id: {
            comments: "$comments",
            createdAt: "$createdAt",
            rating: "$ratings.rating",
            ratingId: "$ratingId",
            ratingType: "$ratingType",
            stars: "$ratings.stars",
          },
          count: { $sum: "$ratings.count" },
          percent: { $sum: "$ratings.percent" },
          starsAvg: { $sum: "$ratings.starsAvg" },
        },
      },
      {
        $match: { count: { $gt: 0 } },
      },
      {
        $project: {
          _id: 0,
          comments: "$_id.comments",
          createdAt: "$_id.createdAt",
          rating: {
            comments: "$_id.comments",
            count: "$count",
            percent: "$percent",
            starsAvg: { $sum: "$starsAvg" },
            rating: "$_id.rating",
            stars: "$_id.stars",
          },
          ratingId: "$_id.ratingId",
          ratingType: "$_id.ratingType",
        },
      },
      { $sort: { "rating.count": -1 } },
      {
        $group: {
          _id: {
            createdAt: "$createdAt",
            ratingType: "$ratingType",
            ratingId: "$ratingId",
          },
          ratings: { $push: "$rating" },
        },
      },
      {
        $project: {
          _id: 0,
          createdAt: "$_id.createdAt",
          ratingType: "$_id.ratingType",
          ratingId: "$_id.ratingId",
          ratings: "$ratings",
          starsAvg: {
            $reduce: {
              in: { $sum: ["$$value", "$$this"] },
              initialValue: 0,
              input: "$ratings.starsAvg",
            },
          },
        },
      },
    ]);
  });
  test("should return a new ratingResult created when loadAverageRatingResult return it", async () => {
    const ratingResult = await testInstance.loadAverageRatingResult(fakeRatingQuery);
    expect(ratingResult).toEqual(fakeRatingResultAverage);
  });
  test("should return null when i pass null", async () => {
    const ratingResult = await testInstance.loadAverageRatingResult(null as any);
    expect(ratingResult).toBeNull();
  });
  test("should return null when loadAverageRatingResult returns null", async () => {
    repository.aggregate.mockResolvedValueOnce(null);
    const ratingResult = await testInstance.loadAverageRatingResult(fakeRatingQuery);
    expect(ratingResult).toBeUndefined();
  });
  test("should rethrows when loadAverageRatingResult throws", async () => {
    repository.aggregate.mockRejectedValueOnce(new Error("error"));
    const ratingResult = testInstance.loadAverageRatingResult(fakeRatingQuery);
    await expect(ratingResult).rejects.toThrow("error");
  });
});
