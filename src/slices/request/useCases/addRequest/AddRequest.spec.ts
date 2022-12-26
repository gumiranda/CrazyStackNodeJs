import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { RequestEntity } from "@/slices/request/entities";
import { AddRequestRepository } from "@/slices/request/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addRequest } from "./AddRequest";

describe("addRequest", () => {
    let testInstance: any;
    let addRequestRepository: MockProxy<AddRequestRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addRequestRepository = mock();
        addRequestRepository.addRequest.mockResolvedValue(fakeRequestEntity);
    });
    beforeEach(() => {
        testInstance = addRequest(addRequestRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addRequest of AddRequestRepository with correct values", async () => {
        await testInstance(fakeRequestEntity);
        expect(addRequestRepository.addRequest).toHaveBeenCalledWith(
            new RequestEntity(fakeRequestEntity)
        );
        expect(addRequestRepository.addRequest).toHaveBeenCalledTimes(1);
    });
    it("should return a new request created when addRequestRepository insert it", async () => {
        const request = await testInstance(fakeRequestEntity);
        expect(request).toEqual(fakeRequestEntity);
    });
    it("should return null a new request created when addRequestRepository insert it", async () => {
        addRequestRepository.addRequest.mockResolvedValue(null);
        const request = await testInstance(fakeRequestEntity);
        expect(request).toBeNull();
    });
    it("should rethrow if addRequest of AddRequestRepository throws", async () => {
        addRequestRepository.addRequest.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeRequestEntity)).rejects.toThrowError("any_error");
    });
});
