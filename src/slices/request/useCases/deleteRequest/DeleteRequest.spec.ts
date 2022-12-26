import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { RequestEntity } from "@/slices/request/entities";
import { DeleteRequestRepository } from "@/slices/request/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteRequest } from "./DeleteRequest";
import { Query } from "@/application/types";

describe("deleteRequest", () => {
    let testInstance: any;
    let fakeQuery: Query;
    let deleteRequestRepository: MockProxy<DeleteRequestRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        deleteRequestRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        deleteRequestRepository.deleteRequest.mockResolvedValue(fakeRequestEntity);
    });
    beforeEach(() => {
        testInstance = deleteRequest(deleteRequestRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call deleteRequest of DeleteRequestRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(deleteRequestRepository.deleteRequest).toHaveBeenCalledWith(fakeQuery);
        expect(deleteRequestRepository.deleteRequest).toHaveBeenCalledTimes(1);
    });
    it("should return a new request deleted when deleteRequestRepository delete it", async () => {
        const request = await testInstance(fakeQuery);
        expect(request).toEqual(fakeRequestEntity);
    });
    it("should return null a new request deleted when deleteRequestRepository delete it", async () => {
        deleteRequestRepository.deleteRequest.mockResolvedValue(null);
        const request = await testInstance(fakeRequestEntity);
        expect(request).toBeNull();
    });
    it("should rethrow if deleteRequest of DeleteRequestRepository throws", async () => {
        deleteRequestRepository.deleteRequest.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
