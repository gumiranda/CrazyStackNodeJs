import { MapRouteEntity } from "./MapRouteEntity";
import MockDate from "mockdate";

export const fakeMapRouteEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeMapRouteEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const fakeMapRoutePaginated = {
  total: 11,
  mapRoutes: [
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
    fakeMapRouteEntity,
  ],
};

describe("MapRoute", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new MapRouteEntity(fakeMapRouteEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeMapRouteEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
