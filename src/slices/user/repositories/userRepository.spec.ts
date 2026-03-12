import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { UserRepository } from "./userRepository";
import { fakeUserEntity, fakeUserPaginated } from "@/slices/user/entities/UserEntity.spec";

describe("UserRepository", () => {
  let fakeQuery: Query;
  let testInstance: UserRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    repository = mock<Repository>();
    fakeQuery = { fields: { name: "123" }, options: {} };
    repository.add.mockResolvedValue(fakeUserEntity);
    repository.getOne.mockResolvedValue(fakeUserEntity);
    repository.update.mockResolvedValue(fakeUserEntity);
    repository.getPaginate.mockResolvedValue(fakeUserPaginated?.users);
    repository.getCount.mockResolvedValue(fakeUserPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
    repository.increment.mockResolvedValue(fakeUserEntity);
  });
  beforeEach(() => {
    testInstance = new UserRepository(repository);
  });
  afterAll(() => {
    MockDate.reset();
  });
  test("should call add of addUser with correct values", async () => {
    await testInstance.addUser(fakeUserEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeUserEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new user when addUser inserts it", async () => {
    const result = await testInstance.addUser(fakeUserEntity);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when addUser returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addUser(fakeUserEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if addUser throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.addUser(fakeUserEntity)).rejects.toThrow("Error");
  });
  test("should call deleteOne of deleteUser with correct values", async () => {
    await testInstance.deleteUser(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return deleted user", async () => {
    const result = await testInstance.deleteUser(fakeQuery);
    expect(result).toBeTruthy();
  });
  test("should return null when deleteUser returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteUser(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if deleteUser throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.deleteUser(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getOne of loadUser with correct values", async () => {
    await testInstance.loadUser(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
  });
  test("should return a user when loadUser loads it", async () => {
    const result = await testInstance.loadUser(fakeQuery);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when loadUser returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadUser(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if loadUser throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadUser(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call getPaginate of loadUserByPage with correct values", async () => {
    await testInstance.loadUserByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(0, fakeQuery?.fields, { createdAt: -1 }, 10, {});
  });
  test("should call getCount of loadUserByPage with correct values", async () => {
    await testInstance.loadUserByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
  });
  test("should return paginated users", async () => {
    const result = await testInstance.loadUserByPage(fakeQuery);
    expect(result).toEqual(fakeUserPaginated);
  });
  test("should return null when loadUserByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadUserByPage(fakeQuery);
    expect(result).toEqual({ users: null, total: 0 });
  });
  test("should handle null query in loadUserByPage", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadUserByPage(null as any);
    expect(result).toEqual({ users: null, total: 0 });
  });
  test("should rethrow if loadUserByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.loadUserByPage(fakeQuery)).rejects.toThrow("Error");
  });
  test("should call update of updateUser with correct values", async () => {
    await testInstance.updateUser(fakeQuery, fakeUserEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeUserEntity);
  });
  test("should return updated user", async () => {
    const result = await testInstance.updateUser(fakeQuery, fakeUserEntity);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when updateUser returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateUser(fakeQuery, fakeUserEntity);
    expect(result).toBeNull();
  });
  test("should handle null query in updateUser", async () => {
    const result = await testInstance.updateUser(null as any, fakeUserEntity);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should rethrow if updateUser throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.updateUser(fakeQuery, fakeUserEntity)).rejects.toThrow("Error");
  });
  test("should call increment of incrementAppointmentsTotal with correct values", async () => {
    await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(repository.increment).toHaveBeenCalledWith(fakeQuery?.fields, { appointmentsTotal: 1 });
  });
  test("should return updated user after increment", async () => {
    const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should rethrow if incrementAppointmentsTotal throws", async () => {
    repository.increment.mockRejectedValueOnce(new Error("Error"));
    await expect(testInstance.incrementAppointmentsTotal(fakeQuery)).rejects.toThrow("Error");
  });
});
