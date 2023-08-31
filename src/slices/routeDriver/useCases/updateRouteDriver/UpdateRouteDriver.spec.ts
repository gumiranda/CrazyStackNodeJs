import { UpdateRouteDriverRepository } from "@/slices/routeDriver/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRouteDriverEntity } from "@/slices/routeDriver/entities/RouteDriverEntity.spec";
import { UpdateRouteDriver, updateRouteDriver } from "./UpdateRouteDriver";

describe("UpdateRouteDriver", () => {
    let fakeQuery: Query;
    let testInstance: UpdateRouteDriver;
    let updateRouteDriverRepository: MockProxy<UpdateRouteDriverRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateRouteDriverRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateRouteDriverRepository.updateRouteDriver.mockResolvedValue(fakeRouteDriverEntity);
    });
    beforeEach(() => {
        testInstance = updateRouteDriver(updateRouteDriverRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateRouteDriver of UpdateRouteDriverRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeRouteDriverEntity);
        expect(updateRouteDriverRepository.updateRouteDriver).toHaveBeenCalledWith(
            fakeQuery,
            fakeRouteDriverEntity
        );
        expect(updateRouteDriverRepository.updateRouteDriver).toHaveBeenCalledTimes(1);
    });
    it("should return a routeDriver updateed when updateRouteDriverRepository insert it", async () => {
        const routeDriver = await testInstance(fakeQuery, fakeRouteDriverEntity);
        expect(routeDriver).toEqual(fakeRouteDriverEntity);
    });
    it("should return null a new routeDriver updateed when updateRouteDriverRepository return it", async () => {
        updateRouteDriverRepository.updateRouteDriver.mockResolvedValue(null);
        const routeDriver = await testInstance(fakeQuery, fakeRouteDriverEntity);
        expect(routeDriver).toBeNull();
    });
    it("should rethrow if updateRouteDriver of UpdateRouteDriverRepository throws", async () => {
        updateRouteDriverRepository.updateRouteDriver.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeRouteDriverEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
