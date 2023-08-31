import { fakeMapRouteEntity } from "@/slices/mapRoute/entities/MapRouteEntity.spec";
import { MapRouteEntity } from "@/slices/mapRoute/entities";
import { DeleteMapRouteRepository } from "@/slices/mapRoute/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteMapRoute } from "./DeleteMapRoute";
import { Query } from "@/application/types";

describe("deleteMapRoute", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteMapRouteRepository: MockProxy<DeleteMapRouteRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteMapRouteRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteMapRouteRepository.deleteMapRoute.mockResolvedValue(fakeMapRouteEntity);
    });
    beforeEach(() => {
        testInstance = deleteMapRoute(deleteMapRouteRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteMapRoute of DeleteMapRouteRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteMapRouteRepository.deleteMapRoute).toHaveBeenCalledWith(fakeQuery);
        expect(deleteMapRouteRepository.deleteMapRoute).toHaveBeenCalledTimes(1);
    });
    it("should return a new mapRoute deleted when deleteMapRouteRepository delete it", async () => {
        const mapRoute = await testInstance(fakeQuery);
        expect(mapRoute).toEqual(fakeMapRouteEntity);
    });
    it("should return null a new mapRoute deleted when deleteMapRouteRepository delete it", async () => {
        deleteMapRouteRepository.deleteMapRoute.mockResolvedValue(null);
        const mapRoute = await testInstance(fakeMapRouteEntity);
        expect(mapRoute).toBeNull();
    });
    it("should rethrow if deleteMapRoute of DeleteMapRouteRepository throws", async () => {
        deleteMapRouteRepository.deleteMapRoute.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
