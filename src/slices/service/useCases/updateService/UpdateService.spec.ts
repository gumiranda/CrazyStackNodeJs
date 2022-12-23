import { UpdateServiceRepository } from "@/slices/service/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeServiceEntity } from "@/slices/service/entities/ServiceEntity.spec";
import { UpdateService, updateService } from "./UpdateService";

describe("UpdateService", () => {
  let fakeQuery: Query;
  let testInstance: UpdateService;
  let updateServiceRepository: MockProxy<UpdateServiceRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateServiceRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateServiceRepository.updateService.mockResolvedValue(fakeServiceEntity);
  });
  beforeEach(() => {
    testInstance = updateService(updateServiceRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateService of UpdateServiceRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeServiceEntity);
    expect(updateServiceRepository.updateService).toHaveBeenCalledWith(
      fakeQuery,
      fakeServiceEntity
    );
    expect(updateServiceRepository.updateService).toHaveBeenCalledTimes(1);
  });
  it("should return a service updateed when updateServiceRepository insert it", async () => {
    const service = await testInstance(fakeQuery, fakeServiceEntity);
    expect(service).toEqual(fakeServiceEntity);
  });
  it("should return null a new service updateed when updateServiceRepository return it", async () => {
    updateServiceRepository.updateService.mockResolvedValue(null);
    const service = await testInstance(fakeQuery, fakeServiceEntity);
    expect(service).toBeNull();
  });
  it("should rethrow if updateService of UpdateServiceRepository throws", async () => {
    updateServiceRepository.updateService.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery, fakeServiceEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
