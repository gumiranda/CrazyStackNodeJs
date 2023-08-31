import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { MapRouteEntity } from "@/slices/mapRoute/entities";
import { AddMapRouteRepository } from "@/slices/mapRoute/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addMapRoute } from "./AddMapRoute";

describe("addMapRoute", () => {
    let testInstance: any;
    let addMapRouteRepository: MockProxy<AddMapRouteRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addMapRouteRepository = mock();
        addMapRouteRepository.addMapRoute.mockResolvedValue(fakeMapRouteEntity);
    });
    beforeEach(() => {
        testInstance = addMapRoute(addMapRouteRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addMapRoute of AddMapRouteRepository with correct values", async () => {
        await testInstance(fakeMapRouteEntity);
        expect(addMapRouteRepository.addMapRoute).toHaveBeenCalledWith(
            new MapRouteEntity(fakeMapRouteEntity)
        );
        expect(addMapRouteRepository.addMapRoute).toHaveBeenCalledTimes(1);
    });
    it("should return a new mapRoute created when addMapRouteRepository insert it", async () => {
        const mapRoute = await testInstance(fakeMapRouteEntity);
        expect(mapRoute).toEqual(fakeMapRouteEntity);
    });
    it("should return null a new mapRoute created when addMapRouteRepository insert it", async () => {
        addMapRouteRepository.addMapRoute.mockResolvedValue(null);
        const mapRoute = await testInstance(fakeMapRouteEntity);
        expect(mapRoute).toBeNull();
    });
    it("should rethrow if addMapRoute of AddMapRouteRepository throws", async () => {
        addMapRouteRepository.addMapRoute.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeMapRouteEntity)).rejects.toThrowError("any_error");
    });
});
