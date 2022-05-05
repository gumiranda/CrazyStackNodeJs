import { UpdateRequestRepository } from "@/slices/request/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { UpdateRequest, updateRequest } from "./UpdateRequest";

describe("UpdateRequest", () => {
    let fakeQuery: Query;
    let testInstance: UpdateRequest;
    let updateRequestRepository: MockProxy<UpdateRequestRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateRequestRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateRequestRepository.updateRequest.mockResolvedValue(fakeRequestEntity);
    });
    beforeEach(() => {
        testInstance = updateRequest(updateRequestRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateRequest of UpdateRequestRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeRequestEntity);
        expect(updateRequestRepository.updateRequest).toHaveBeenCalledWith(
            fakeQuery,
            fakeRequestEntity
        );
        expect(updateRequestRepository.updateRequest).toHaveBeenCalledTimes(1);
    });
    it("should return a request updateed when updateRequestRepository insert it", async () => {
        const request = await testInstance(fakeQuery, fakeRequestEntity);
        expect(request).toEqual(fakeRequestEntity);
    });
    it("should return null a new request updateed when updateRequestRepository return it", async () => {
        updateRequestRepository.updateRequest.mockResolvedValue(null);
        const request = await testInstance(fakeQuery, fakeRequestEntity);
        expect(request).toBeNull();
    });
    it("should rethrow if updateRequest of UpdateRequestRepository throws", async () => {
        updateRequestRepository.updateRequest.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeRequestEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
