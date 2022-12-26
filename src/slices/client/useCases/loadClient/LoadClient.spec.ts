import { LoadClientRepository } from "@/slices/client/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { LoadClient, loadClient } from "./LoadClient";

describe("LoadClient", () => {
    let fakeQuery: Query;
    let testInstance: LoadClient;
    let loadClientRepository: MockProxy<LoadClientRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        loadClientRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        loadClientRepository.loadClient.mockResolvedValue(fakeClientEntity);
    });
    beforeEach(() => {
        testInstance = loadClient(loadClientRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call loadClient of LoadClientRepository with correct values", async () => {
        await testInstance(fakeQuery);
        expect(loadClientRepository.loadClient).toHaveBeenCalledWith(fakeQuery);
        expect(loadClientRepository.loadClient).toHaveBeenCalledTimes(1);
    });
    it("should return a client loaded when loadClientRepository insert it", async () => {
        const client = await testInstance(fakeQuery);
        expect(client).toEqual(fakeClientEntity);
    });
    it("should return null a new client loaded when loadClientRepository return it", async () => {
        loadClientRepository.loadClient.mockResolvedValue(null);
        const client = await testInstance(fakeQuery);
        expect(client).toBeNull();
    });
    it("should rethrow if loadClient of LoadClientRepository throws", async () => {
        loadClientRepository.loadClient.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
    });
});
