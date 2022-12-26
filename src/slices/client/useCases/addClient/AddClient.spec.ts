import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { ClientEntity } from "@/slices/client/entities";
import { AddClientRepository } from "@/slices/client/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addClient } from "./AddClient";

describe("addClient", () => {
    let testInstance: any;
    let addClientRepository: MockProxy<AddClientRepository>;
    beforeAll(async () => {
        MockDate.set(new Date());
        addClientRepository = mock();
        addClientRepository.addClient.mockResolvedValue(fakeClientEntity);
    });
    beforeEach(() => {
        testInstance = addClient(addClientRepository);
    });
    afterAll(async () => {
        MockDate.reset();
    });
    it("should call addClient of AddClientRepository with correct values", async () => {
        await testInstance(fakeClientEntity);
        expect(addClientRepository.addClient).toHaveBeenCalledWith(
            new ClientEntity(fakeClientEntity)
        );
        expect(addClientRepository.addClient).toHaveBeenCalledTimes(1);
    });
    it("should return a new client created when addClientRepository insert it", async () => {
        const client = await testInstance(fakeClientEntity);
        expect(client).toEqual(fakeClientEntity);
    });
    it("should return null a new client created when addClientRepository insert it", async () => {
        addClientRepository.addClient.mockResolvedValue(null);
        const client = await testInstance(fakeClientEntity);
        expect(client).toBeNull();
    });
    it("should rethrow if addClient of AddClientRepository throws", async () => {
        addClientRepository.addClient.mockRejectedValueOnce(new Error("any_error"));
        await expect(testInstance(fakeClientEntity)).rejects.toThrowError("any_error");
    });
});
