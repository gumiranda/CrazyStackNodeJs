import { fakeClientEntity } from "@/slices/client/entities/ClientEntity.spec";
import { ClientEntity } from "@/slices/client/entities";
import { DeleteClientRepository } from "@/slices/client/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteClient } from "./DeleteClient";
import { Query } from "@/application/types";

describe("deleteClient", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteClientRepository: MockProxy<DeleteClientRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteClientRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteClientRepository.deleteClient.mockResolvedValue(fakeClientEntity);
  });
  beforeEach(() => {
    testInstance = deleteClient(deleteClientRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteClient of DeleteClientRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteClientRepository.deleteClient).toHaveBeenCalledWith(fakeQuery);
    expect(deleteClientRepository.deleteClient).toHaveBeenCalledTimes(1);
  });
  it("should return a new client deleted when deleteClientRepository delete it", async () => {
    const client = await testInstance(fakeQuery);
    expect(client).toEqual(fakeClientEntity);
  });
  it("should return null a new client deleted when deleteClientRepository delete it", async () => {
    deleteClientRepository.deleteClient.mockResolvedValue(null);
    const client = await testInstance(fakeClientEntity);
    expect(client).toBeNull();
  });
  it("should rethrow if deleteClient of DeleteClientRepository throws", async () => {
    deleteClientRepository.deleteClient.mockRejectedValueOnce(new Error("any_error"));
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
