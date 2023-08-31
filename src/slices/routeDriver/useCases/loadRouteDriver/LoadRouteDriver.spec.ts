import { LoadRouteDriverRepository } from "@/slices/routeDriver/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRouteDriverEntity } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { LoadRouteDriver, loadRouteDriver } from "./LoadRouteDriver";

describe("LoadRouteDriver", () => {
    let fakeQuery: Query;
    let testInstance: LoadRouteDriver;
    let loadRouteDriverRepository: MockProxy<LoadRouteDriverRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRouteDriverRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRouteDriverRepository.loadRouteDriver.mockResolvedValue(fakeRouteDriverEntity);
    });
    beforeEach(() => {
        testInstance = loadRouteDriver(loadRouteDriverRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRouteDriver of LoadRouteDriverRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRouteDriverRepository.loadRouteDriver).toHaveBeenCalledWith(fakeQuery);
        expect(loadRouteDriverRepository.loadRouteDriver).toHaveBeenCalledTimes(1);
    });
    it("should return a routeDriver loaded when loadRouteDriverRepository insert it", async () => {
        const routeDriver = await testInstance(fakeQuery);
        expect(routeDriver).toEqual(fakeRouteDriverEntity);
    });
    it("should return null a new routeDriver loaded when loadRouteDriverRepository return it", async () => {
        loadRouteDriverRepository.loadRouteDriver.mockResolvedValue(null);
        const routeDriver = await testInstance(fakeQuery);
        expect(routeDriver).toBeNull();
    });
    it("should rethrow if loadRouteDriver of LoadRouteDriverRepository throws", async () => {
        loadRouteDriverRepository.loadRouteDriver.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
