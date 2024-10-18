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
  test("mapAnyToMongoObject", () => {
    const objectMapped = mapAnyToMongoObject(null as any);
    expect(objectMapped).toBeNull();
  });
});
