import { PlaceEntity } from "./PlaceEntity";
import MockDate from "mockdate";

export const fakePlaceEntity = {
  _id: "123",
  createdById: "123",
  name: "fakePlaceEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryPlaceId: "",
};
export const fakePlacePaginated = {
  total: 11,
  places: [
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
    fakePlaceEntity,
  ],
};

describe("Place", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new PlaceEntity(fakePlaceEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakePlaceEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
