import { LoadRequestByPageRepository } from "@/slices/request/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeRequestPaginated } from "@/slices/request/entities/RequestEntity.spec";
import { LoadRequestByPage, loadRequestByPage } from "./LoadRequestByPage";

describe("LoadRequestByPage", () => {
    let fakeQuery: Query;
    let testInstance: LoadRequestByPage;
    let loadRequestByPageRepository: MockProxy<LoadRequestByPageRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadRequestByPageRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadRequestByPageRepository.loadRequestByPage.mockResolvedValue(
            fakeRequestPaginated
        );
    });
    beforeEach(() => {
        testInstance = loadRequestByPage(loadRequestByPageRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadRequestByPage of LoadRequestByPageRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadRequestByPageRepository.loadRequestByPage).toHaveBeenCalledWith(
            fakeQuery
        );
        expect(loadRequestByPageRepository.loadRequestByPage).toHaveBeenCalledTimes(1);
    });
    it("should return a request loaded when loadRequestByPageRepository insert it", async () => {
        const request = await testInstance(fakeQuery);
        expect(request).toEqual(fakeRequestPaginated);
    });
    it("should return null a new request loaded when loadRequestByPageRepository return it", async () => {
        loadRequestByPageRepository.loadRequestByPage.mockResolvedValue(null);
        const request = await testInstance(fakeQuery);
        expect(request).toBeNull();
    });
    it("should rethrow if loadRequestByPage of LoadRequestByPageRepository throws", async () => {
        loadRequestByPageRepository.loadRequestByPage.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
