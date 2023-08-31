import { LoadMapRouteByPageRepository } from "@/slices/mapRoute/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeMapRoutePaginated } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { LoadMapRouteByPage, loadMapRouteByPage } from "./LoadMapRouteByPage";

describe("LoadMapRouteByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadMapRouteByPage;
    let loadMapRouteByPageRepository: MockProxy<LoadMapRouteByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadMapRouteByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadMapRouteByPageRepository.loadMapRouteByPage.mockResolvedValue(
            fakeMapRoutePaginated
        );
    });
    beforeEach(() => {
        testInstance = loadMapRouteByPage(loadMapRouteByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadMapRouteByPage of LoadMapRouteByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadMapRouteByPageRepository.loadMapRouteByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadMapRouteByPageRepository.loadMapRouteByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a mapRoute loaded when loadMapRouteByPageRepository insert it", async () => {
        const mapRoute = await testInstance(fakeQuery);
        expect(mapRoute).toEqual(fakeMapRoutePaginated);
    });
    it("should return null a new mapRoute loaded when loadMapRouteByPageRepository return it", async () => {
        loadMapRouteByPageRepository.loadMapRouteByPage.mockResolvedValue(null);
        const mapRoute = await testInstance(fakeQuery);
        expect(mapRoute).toBeNull();
    });
    it("should rethrow if loadMapRouteByPage of LoadMapRouteByPageRepository throws", async () => {
        loadMapRouteByPageRepository.loadMapRouteByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
