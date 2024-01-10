import { LoadRouteDriverByPageRepository } from "@/slices/routeDriver/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRouteDriverPaginated } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { LoadRouteDriverByPage, loadRouteDriverByPage } from "./LoadRouteDriverByPage";

describe("LoadRouteDriverByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadRouteDriverByPage;
  let loadRouteDriverByPageRepository: MockProxy<LoadRouteDriverByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadRouteDriverByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadRouteDriverByPageRepository.loadRouteDriverByPage.mockResolvedValue(
      fakeRouteDriverPaginated
    );
  });
  beforeEach(() => {
    testInstance = loadRouteDriverByPage(loadRouteDriverByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadRouteDriverByPage of LoadRouteDriverByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadRouteDriverByPageRepository.loadRouteDriverByPage).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadRouteDriverByPageRepository.loadRouteDriverByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a routeDriver loaded when loadRouteDriverByPageRepository insert it", async () => {
    const routeDriver = await testInstance(fakeQuery);
    expect(routeDriver).toEqual(fakeRouteDriverPaginated);
  });
  it("should return null a new routeDriver loaded when loadRouteDriverByPageRepository return it", async () => {
    loadRouteDriverByPageRepository.loadRouteDriverByPage.mockResolvedValue(null);
    const routeDriver = await testInstance(fakeQuery);
    expect(routeDriver).toBeNull();
  });
  it("should rethrow if loadRouteDriverByPage of LoadRouteDriverByPageRepository throws", async () => {
    loadRouteDriverByPageRepository.loadRouteDriverByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
