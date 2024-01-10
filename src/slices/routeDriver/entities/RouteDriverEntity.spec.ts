import { RouteDriverEntity } from "./RouteDriverEntity";
import MockDate from "mockdate";

export const fakeRouteDriverEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeRouteDriverEntity",
  active: true,
  routeId: "string",
  points: [],
  status: "initialized", //FINALIZADO, INICIADO, ETC
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const fakeRouteDriverPaginated = {
  total: 11,
  routeDrivers: [
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
    fakeRouteDriverEntity,
  ],
};

describe("RouteDriver", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new RouteDriverEntity(fakeRouteDriverEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeRouteDriverEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
