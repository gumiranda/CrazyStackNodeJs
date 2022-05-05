import { UpdateClientRepository } from "@/slices/client/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { UpdateClient, updateClient } from "./UpdateClient";

describe("UpdateClient", () => {
    let fakeQuery: Query;
    let testInstance: UpdateClient;
    let updateClientRepository: MockProxy<UpdateClientRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        updateClientRepository = mock();
        fakeQuery = { fields: { name: "123" }, options: {} };
        updateClientRepository.updateClient.mockResolvedValue(fakeClientEntity);
    });
    beforeEach(() => {
        testInstance = updateClient(updateClientRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call updateClient of UpdateClientRepository with correct values", async () => {
        await testInstance(fakeQuery, fakeClientEntity);
        expect(updateClientRepository.updateClient).toHaveBeenCalledWith(
            fakeQuery,
            fakeClientEntity
        );
        expect(updateClientRepository.updateClient).toHaveBeenCalledTimes(1);
    });
    it("should return a client updateed when updateClientRepository insert it", async () => {
        const client = await testInstance(fakeQuery, fakeClientEntity);
        expect(client).toEqual(fakeClientEntity);
    });
    it("should return null a new client updateed when updateClientRepository return it", async () => {
        updateClientRepository.updateClient.mockResolvedValue(null);
        const client = await testInstance(fakeQuery, fakeClientEntity);
        expect(client).toBeNull();
    });
    it("should rethrow if updateClient of UpdateClientRepository throws", async () => {
        updateClientRepository.updateClient.mockRejectedValueOnce(
            new Error("any_error")
        );
        await expect(testInstance(fakeQuery, fakeClientEntity)).rejects.toThrowError(
            "any_error"
        );
    });
});
