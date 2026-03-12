import { QueryBuilder } from "./queryBuilder";

describe("QueryBuilder", () => {
  let sut: QueryBuilder;
  beforeEach(() => {
    sut = new QueryBuilder();
  });
  it("should build an empty pipeline", () => {
    expect(sut.build()).toEqual([]);
  });
  it("should add $match stage", () => {
    const result = sut.match({ active: true }).build();
    expect(result).toEqual([{ $match: { active: true } }]);
  });
  it("should add $group stage", () => {
    const result = sut.group({ _id: "$status", total: { $sum: 1 } }).build();
    expect(result).toEqual([{ $group: { _id: "$status", total: { $sum: 1 } } }]);
  });
  it("should add $count stage", () => {
    const result = sut.count("total").build();
    expect(result).toEqual([{ $count: "total" }]);
  });
  it("should add $geoNear stage", () => {
    const geoData = { near: { type: "Point", coordinates: [-46, -23] }, distanceField: "dist" };
    const result = sut.geoNear(geoData).build();
    expect(result).toEqual([{ $geoNear: geoData }]);
  });
  it("should add $project stage", () => {
    const result = sut.project({ name: 1, email: 1 }).build();
    expect(result).toEqual([{ $project: { name: 1, email: 1 } }]);
  });
  it("should add $skip stage", () => {
    const result = sut.skip(10).build();
    expect(result).toEqual([{ $skip: 10 }]);
  });
  it("should add $limit stage", () => {
    const result = sut.limit(5).build();
    expect(result).toEqual([{ $limit: 5 }]);
  });
  it("should add $lookup stage", () => {
    const lookupData = { from: "users", localField: "userId", foreignField: "_id", as: "user" };
    const result = sut.lookup(lookupData).build();
    expect(result).toEqual([{ $lookup: lookupData }]);
  });
  it("should add $sort stage", () => {
    const result = sut.sort({ createdAt: -1 }).build();
    expect(result).toEqual([{ $sort: { createdAt: -1 } }]);
  });
  it("should add $unwind stage", () => {
    const result = sut.unwind("$user").build();
    expect(result).toEqual([{ $unwind: "$user" }]);
  });
  it("should chain multiple stages", () => {
    const result = sut
      .match({ active: true })
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(10)
      .build();
    expect(result).toEqual([
      { $match: { active: true } },
      { $sort: { createdAt: -1 } },
      { $skip: 0 },
      { $limit: 10 },
    ]);
  });
  it("should support fluent interface (each method returns QueryBuilder)", () => {
    expect(sut.match({})).toBe(sut);
    expect(sut.group({})).toBe(sut);
    expect(sut.count("x")).toBe(sut);
    expect(sut.geoNear({})).toBe(sut);
    expect(sut.project({})).toBe(sut);
    expect(sut.skip(0)).toBe(sut);
    expect(sut.limit(1)).toBe(sut);
    expect(sut.lookup({})).toBe(sut);
    expect(sut.sort({})).toBe(sut);
    expect(sut.unwind("$x")).toBe(sut);
  });
  it("should build a complex aggregation pipeline", () => {
    const result = sut
      .geoNear({ near: { type: "Point", coordinates: [0, 0] }, distanceField: "dist" })
      .match({ active: true })
      .lookup({ from: "services", localField: "serviceId", foreignField: "_id", as: "service" })
      .unwind("$service")
      .group({ _id: "$ownerId", total: { $sum: 1 } })
      .project({ total: 1 })
      .sort({ total: -1 })
      .skip(0)
      .limit(10)
      .count("count")
      .build();
    expect(result).toHaveLength(10);
  });
});
