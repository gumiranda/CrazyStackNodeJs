import { LoadServiceRepository } from "@/slices/service/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { LoadService, loadService } from "./LoadService";

describe("LoadService", () => {
    let fakeQuery: Query;
    let testInstance: LoadService;
    let loadServiceRepository: MockProxy<LoadServiceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadServiceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadServiceRepository.loadService.mockResolvedValue(fakeServiceEntity);
    });
    beforeEach(() => {
        testInstance = loadService(loadServiceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadService of LoadServiceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadServiceRepository.loadService).toHaveBeenCalledWith(fakeQuery);
        expect(loadServiceRepository.loadService).toHaveBeenCalledTimes(1);
    });
    it("should return a service loaded when loadServiceRepository insert it", async () => {
        const service = await testInstance(fakeQuery);
        expect(service).toEqual(fakeServiceEntity);
    });
    it("should return null a new service loaded when loadServiceRepository return it", async () => {
        loadServiceRepository.loadService.mockResolvedValue(null);
        const service = await testInstance(fakeQuery);
        expect(service).toBeNull();
    });
    it("should rethrow if loadService of LoadServiceRepository throws", async () => {
        loadServiceRepository.loadService.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
