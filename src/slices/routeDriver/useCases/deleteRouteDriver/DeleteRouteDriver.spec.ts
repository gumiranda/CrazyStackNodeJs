import { fakeRouteDriverEntity } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { RouteDriverEntity } from "@/slices/routeDriver/entities";
import { DeleteRouteDriverRepository } from "@/slices/routeDriver/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteRouteDriver } from "./DeleteRouteDriver";
import { Query } from "@/application/types";

describe("deleteRouteDriver", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteRouteDriverRepository: MockProxy<DeleteRouteDriverRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteRouteDriverRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteRouteDriverRepository.deleteRouteDriver.mockResolvedValue(fakeRouteDriverEntity);
  });
  beforeEach(() => {
    testInstance = deleteRouteDriver(deleteRouteDriverRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteRouteDriver of DeleteRouteDriverRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteRouteDriverRepository.deleteRouteDriver).toHaveBeenCalledWith(fakeQuery);
    expect(deleteRouteDriverRepository.deleteRouteDriver).toHaveBeenCalledTimes(1);
  });
  it("should return a new routeDriver deleted when deleteRouteDriverRepository delete it", async () => {
    const routeDriver = await testInstance(fakeQuery);
    expect(routeDriver).toEqual(fakeRouteDriverEntity);
  });
  it("should return null a new routeDriver deleted when deleteRouteDriverRepository delete it", async () => {
    deleteRouteDriverRepository.deleteRouteDriver.mockResolvedValue(null);
    const routeDriver = await testInstance(fakeRouteDriverEntity);
    expect(routeDriver).toBeNull();
  });
  it("should rethrow if deleteRouteDriver of DeleteRouteDriverRepository throws", async () => {
    deleteRouteDriverRepository.deleteRouteDriver.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
