import { LoadClientByPageRepository } from "@/slices/client/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeClientPaginated } from "@/slices/client/entities/ClientEntity.spec";
import { LoadClientByPage, loadClientByPage } from "./LoadClientByPage";

describe("LoadClientByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadClientByPage;
  let loadClientByPageRepository: MockProxy<LoadClientByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadClientByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadClientByPageRepository.loadClientByPage.mockResolvedValue(fakeClientPaginated);
  });
  beforeEach(() => {
    testInstance = loadClientByPage(loadClientByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadClientByPage of LoadClientByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadClientByPageRepository.loadClientByPage).toHaveBeenCalledWith(fakeQuery);
    expect(loadClientByPageRepository.loadClientByPage).toHaveBeenCalledTimes(1);
  });
  it("should return a client loaded when loadClientByPageRepository insert it", async () => {
    const client = await testInstance(fakeQuery);
    expect(client).toEqual(fakeClientPaginated);
  });
  it("should return null a new client loaded when loadClientByPageRepository return it", async () => {
    loadClientByPageRepository.loadClientByPage.mockResolvedValue(null);
    const client = await testInstance(fakeQuery);
    expect(client).toBeNull();
  });
  it("should rethrow if loadClientByPage of LoadClientByPageRepository throws", async () => {
    loadClientByPageRepository.loadClientByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
