import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { ServiceEntity } from "@/slices/service/entities";
import { DeleteServiceRepository } from "@/slices/service/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteService } from "./DeleteService";
import { Query } from "@/application/types";

describe("deleteService", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteServiceRepository: MockProxy<DeleteServiceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteServiceRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteServiceRepository.deleteService.mockResolvedValue(fakeServiceEntity);
    });
    beforeEach(() => {
        testInstance = deleteService(deleteServiceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteService of DeleteServiceRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteServiceRepository.deleteService).toHaveBeenCalledWith(fakeQuery);
        expect(deleteServiceRepository.deleteService).toHaveBeenCalledTimes(1);
    });
    it("should return a new service deleted when deleteServiceRepository delete it", async () => {
        const service = await testInstance(fakeQuery);
        expect(service).toEqual(fakeServiceEntity);
    });
    it("should return null a new service deleted when deleteServiceRepository delete it", async () => {
        deleteServiceRepository.deleteService.mockResolvedValue(null);
        const service = await testInstance(fakeServiceEntity);
        expect(service).toBeNull();
    });
    it("should rethrow if deleteService of DeleteServiceRepository throws", async () => {
        deleteServiceRepository.deleteService.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
