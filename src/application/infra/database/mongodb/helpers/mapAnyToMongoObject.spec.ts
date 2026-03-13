import { ObjectId } from "mongodb";
import { mapAnyToMongoObject } from "./mapAnyToMongoObject";
describe("mapAnyToMongoObject", () => {
  test("mapAnyToMongoObject when id is object", () => {
    const fakeId = ObjectId.createFromTime(new Date().getTime()).toString();
    const objectMapped = mapAnyToMongoObject({
      userId: fakeId,
      anyField: "anyValue",
    });
    expect(objectMapped).toEqual({
      userId: new ObjectId(fakeId),
      anyField: "anyValue",
    });
  });
  test("mapAnyToMongoObject when id is array", () => {
    const fakeIds = [
      ObjectId.createFromTime(new Date().getTime()).toString(),
      ObjectId.createFromTime(new Date().getTime()).toString(),
    ];
    const objectMapped = mapAnyToMongoObject({
      userIds: fakeIds,
      anyField: "anyValue",
    });
    expect(objectMapped).toEqual({
      userIds: [new ObjectId(fakeIds[0]), new ObjectId(fakeIds[1])],
      anyField: "anyValue",
    });
  });
  test("mapAnyToMongoObject with null input", () => {
    const objectMapped = mapAnyToMongoObject(null as any);
    expect(objectMapped).toBeNull();
  });
  test("mapAnyToMongoObject with undefined input", () => {
    const objectMapped = mapAnyToMongoObject(undefined as any);
    expect(objectMapped).toBeNull();
  });
  test("mapAnyToMongoObject with empty object", () => {
    const objectMapped = mapAnyToMongoObject({});
    expect(objectMapped).toBeNull();
  });
  test("mapAnyToMongoObject with non-object input", () => {
    const objectMapped = mapAnyToMongoObject("string" as any);
    expect(objectMapped).toBeNull();
  });
  test("mapAnyToMongoObject with _ids field", () => {
    const fakeIds = [
      ObjectId.createFromTime(new Date().getTime()).toString(),
      ObjectId.createFromTime(new Date().getTime()).toString(),
    ];
    const objectMapped = mapAnyToMongoObject({
      user_ids: fakeIds,
      anyField: "anyValue",
    });
    expect(objectMapped).toEqual({
      user_ids: [new ObjectId(fakeIds[0]), new ObjectId(fakeIds[1])],
      anyField: "anyValue",
    });
  });
  test("mapAnyToMongoObject with Id field shorter than 24 chars", () => {
    const objectMapped = mapAnyToMongoObject({
      userId: "short",
      anyField: "anyValue",
    });
    expect(objectMapped).toEqual({
      userId: "short",
      anyField: "anyValue",
    });
  });
  test("mapAnyToMongoObject with non-string Id field", () => {
    const objectMapped = mapAnyToMongoObject({
      userId: 12345,
      anyField: "anyValue",
    });
    expect(objectMapped).toEqual({
      userId: 12345,
      anyField: "anyValue",
    });
  });
});
