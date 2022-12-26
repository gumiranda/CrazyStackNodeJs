import { LoadRequestRepository } from "@/slices/request/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRequestEntity } from "@/slices/request/entities/RequestEntity.spec";
import { LoadRequest, loadRequest } from "./LoadRequest";

describe("LoadRequest", () => {
    let fakeQuery: Query;
    let testInstance: LoadRequest;
    let loadRequestRepository: MockProxy<LoadRequestRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRequestRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRequestRepository.loadRequest.mockResolvedValue(fakeRequestEntity);
    });
    beforeEach(() => {
        testInstance = loadRequest(loadRequestRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRequest of LoadRequestRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRequestRepository.loadRequest).toHaveBeenCalledWith(fakeQuery);
        expect(loadRequestRepository.loadRequest).toHaveBeenCalledTimes(1);
    });
    it("should return a request loaded when loadRequestRepository insert it", async () => {
        const request = await testInstance(fakeQuery);
        expect(request).toEqual(fakeRequestEntity);
    });
    it("should return null a new request loaded when loadRequestRepository return it", async () => {
        loadRequestRepository.loadRequest.mockResolvedValue(null);
        const request = await testInstance(fakeQuery);
        expect(request).toBeNull();
    });
    it("should rethrow if loadRequest of LoadRequestRepository throws", async () => {
        loadRequestRepository.loadRequest.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
