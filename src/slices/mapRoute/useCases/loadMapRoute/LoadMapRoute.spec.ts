import { LoadMapRouteRepository } from "@/slices/mapRoute/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { LoadMapRoute, loadMapRoute } from "./LoadMapRoute";

describe("LoadMapRoute", () => {
    let fakeQuery: Query;
    let testInstance: LoadMapRoute;
    let loadMapRouteRepository: MockProxy<LoadMapRouteRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadMapRouteRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadMapRouteRepository.loadMapRoute.mockResolvedValue(fakeMapRouteEntity);
    });
    beforeEach(() => {
        testInstance = loadMapRoute(loadMapRouteRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadMapRoute of LoadMapRouteRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadMapRouteRepository.loadMapRoute).toHaveBeenCalledWith(fakeQuery);
        expect(loadMapRouteRepository.loadMapRoute).toHaveBeenCalledTimes(1);
    });
    it("should return a mapRoute loaded when loadMapRouteRepository insert it", async () => {
        const mapRoute = await testInstance(fakeQuery);
        expect(mapRoute).toEqual(fakeMapRouteEntity);
    });
    it("should return null a new mapRoute loaded when loadMapRouteRepository return it", async () => {
        loadMapRouteRepository.loadMapRoute.mockResolvedValue(null);
        const mapRoute = await testInstance(fakeQuery);
        expect(mapRoute).toBeNull();
    });
    it("should rethrow if loadMapRoute of LoadMapRouteRepository throws", async () => {
        loadMapRouteRepository.loadMapRoute.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
