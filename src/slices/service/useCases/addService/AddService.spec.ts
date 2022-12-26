import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { ServiceEntity } from "@/slices/service/entities";
import { AddServiceRepository } from "@/slices/service/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addService } from "./AddService";

describe("addService", () => {
    let testInstance: any;
    let addServiceRepository: MockProxy<AddServiceRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addServiceRepository = mock();
        addServiceRepository.addService.mockResolvedValue(fakeServiceEntity);
    });
    beforeEach(() => {
        testInstance = addService(addServiceRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addService of AddServiceRepository with correct values", async () => {
        await testInstance(fakeServiceEntity);
        expect(addServiceRepository.addService).toHaveBeenCalledWith(
            new ServiceEntity(fakeServiceEntity)
        );
        expect(addServiceRepository.addService).toHaveBeenCalledTimes(1);
    });
    it("should return a new service created when addServiceRepository insert it", async () => {
        const service = await testInstance(fakeServiceEntity);
        expect(service).toEqual(fakeServiceEntity);
    });
    it("should return null a new service created when addServiceRepository insert it", async () => {
        addServiceRepository.addService.mockResolvedValue(null);
        const service = await testInstance(fakeServiceEntity);
        expect(service).toBeNull();
    });
    it("should rethrow if addService of AddServiceRepository throws", async () => {
        addServiceRepository.addService.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeServiceEntity)).rejects.toThrowError("any_error");
    });
});
