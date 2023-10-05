import { fakeRouteDriverEntity } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { RouteDriverEntity } from "@/slices/routeDriver/entities";
import { AddRouteDriverRepository } from "@/slices/routeDriver/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addRouteDriver } from "./AddRouteDriver";

describe("addRouteDriver", () => {
  let testInstance: any;
  let addRouteDriverRepository: MockProxy<AddRouteDriverRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRouteDriverRepository = mock();
    addRouteDriverRepository.addRouteDriver.mockResolvedValue(fakeRouteDriverEntity);
  });
  beforeEach(() => {
    testInstance = addRouteDriver(addRouteDriverRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addRouteDriver of AddRouteDriverRepository with correct values", async () => {
    await testInstance(fakeRouteDriverEntity);
    expect(addRouteDriverRepository.addRouteDriver).toHaveBeenCalledWith(
      new RouteDriverEntity(fakeRouteDriverEntity)
    );
    expect(addRouteDriverRepository.addRouteDriver).toHaveBeenCalledTimes(1);
  });
  it("should return a new routeDriver created when addRouteDriverRepository insert it", async () => {
    const routeDriver = await testInstance(fakeRouteDriverEntity);
    expect(routeDriver).toEqual(fakeRouteDriverEntity);
  });
  it("should return null a new routeDriver created when addRouteDriverRepository insert it", async () => {
    addRouteDriverRepository.addRouteDriver.mockResolvedValue(null);
    const routeDriver = await testInstance(fakeRouteDriverEntity);
    expect(routeDriver).toBeNull();
  });
  it("should rethrow if addRouteDriver of AddRouteDriverRepository throws", async () => {
    addRouteDriverRepository.addRouteDriver.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeRouteDriverEntity)).rejects.toThrowError("any_error");
  });
});
