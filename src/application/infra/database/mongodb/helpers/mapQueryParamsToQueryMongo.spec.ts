import MockDate from "mockdate";
import { ObjectId } from "mongodb";
import {
  mapQueryParamsToQueryMongo,
  mountGeoNearQuery,
} from "./mapQueryParamsToQueryMongo";
import { subHours } from "date-fns";

describe("mapQueryParamsToQueryMongo", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });
  test("mapQueryParamsToQueryMongo with array of string ids", () => {
    const fakeId1 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId2 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId3 = ObjectId.createFromTime(new Date().getTime()).toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      price: "5",
      comissionoperatorgt: "50",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      price: { $eq: Number("5") },
      comission: { $gt: Number("50") },
      userId: new ObjectId(fakeId3),
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with dates will generate date in future", () => {
    const fakeId1 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId2 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId3 = ObjectId.createFromTime(new Date().getTime()).toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      isFutureinitDate: "1",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      initDate: { $gte: subHours(new Date(), 4).toISOString() },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with dates will generate date in past", () => {
    const fakeId1 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId2 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId3 = ObjectId.createFromTime(new Date().getTime()).toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      isPastinitDate: "1",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      initDate: { $lte: subHours(new Date(), 4).toISOString() },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with 2 dates will generate query between dates", () => {
    const fakeId1 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId2 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId3 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeDate = new Date().toISOString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      initDate: fakeDate,
      endDate: fakeDate,
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      initDate: { $lte: fakeDate, $gte: fakeDate },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with string will generate regex when necessary", () => {
    const fakeId1 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId2 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId3 = ObjectId.createFromTime(new Date().getTime()).toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      nametextregex: "lalal",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      name: { $regex: "lalal", $options: "i" },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo with string will generate query when necessary", () => {
    const fakeId1 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId2 = ObjectId.createFromTime(new Date().getTime()).toString();
    const fakeId3 = ObjectId.createFromTime(new Date().getTime()).toString();
    const objectMapped = mapQueryParamsToQueryMongo({
      userIds: `${fakeId1},${fakeId2}`,
      userId: fakeId3,
      anyField: "anyValue",
      nametext: "lalal",
    });
    expect(objectMapped).toEqual({
      anyField: "anyValue",
      userId: new ObjectId(fakeId3),
      $text: { $search: "lalal", $caseSensitive: false, $diacriticSensitive: false },
      userIds: {
        $elemMatch: { $in: [new ObjectId(fakeId1), new ObjectId(fakeId2)] },
      },
    });
  });
  test("mapQueryParamsToQueryMongo", () => {
    const objectMapped = mapQueryParamsToQueryMongo(null as any);
    expect(objectMapped).toBeUndefined();
  });
  test("mapQueryParamsToQueryMongo with null value should set key to null", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      deletedAt: "null",
      name: "test",
    });
    expect(objectMapped).toEqual({
      deletedAt: null,
      name: "test",
    });
  });
  test("mountGeoNearQuery", () => {
    const objectMapped = mountGeoNearQuery(null as any);
    expect(objectMapped).toBeNull();
  });
  test("mountGeoNearQuery function", () => {
    const objectMapped = mountGeoNearQuery({
      query: { name: "text" },
      coordinates: [0, 1.1],
    });
    expect(objectMapped).toEqual({
      near: { type: "Point", coordinates: [0, 1.1] },
      query: { name: "text" },
      distanceField: "distance",
      spherical: true,
      maxDistance: 20000000,
    });
  });
  test("mapQueryParamsToQueryMongo with gte operator", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      priceoperatorgte: "100",
    });
    expect(objectMapped).toEqual({
      price: { $gte: 100 },
    });
  });
  test("mapQueryParamsToQueryMongo with lt operator", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      priceoperatorlt: "50",
    });
    expect(objectMapped).toEqual({
      price: { $lt: 50 },
    });
  });
  test("mapQueryParamsToQueryMongo with lte operator", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      priceoperatorlte: "200",
    });
    expect(objectMapped).toEqual({
      price: { $lte: 200 },
    });
  });
  test("mapQueryParamsToQueryMongo with ne operator", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      statusoperatorne: "3",
    });
    expect(objectMapped).toEqual({
      status: { $ne: 3 },
    });
  });
  test("mapQueryParamsToQueryMongo with empty object", () => {
    const objectMapped = mapQueryParamsToQueryMongo({});
    expect(objectMapped).toBeUndefined();
  });
  test("mapQueryParamsToQueryMongo with undefined", () => {
    const objectMapped = mapQueryParamsToQueryMongo(undefined as any);
    expect(objectMapped).toBeUndefined();
  });
  test("mapQueryParamsToQueryMongo with endDate only (should be excluded)", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      endDate: "2024-01-01",
      name: "test",
    });
    expect(objectMapped).toEqual({
      name: "test",
    });
  });
  test("mapQueryParamsToQueryMongo with textregex containing special chars", () => {
    const objectMapped = mapQueryParamsToQueryMongo({
      nametextregex: "test.value+special",
    });
    expect(objectMapped).toEqual({
      name: { $regex: "test\\.value\\+special", $options: "i" },
    });
  });
  test("mountGeoNearQuery with empty object", () => {
    const objectMapped = mountGeoNearQuery({});
    expect(objectMapped).toBeNull();
  });
  test("mountGeoNearQuery with object without coordinates", () => {
    const objectMapped = mountGeoNearQuery({ query: { name: "text" } });
    expect(objectMapped).toBeNull();
  });
});
