import { fakeUserEntity, fakeUserPaginated } from "@/slices/user/entities/UserEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { UserRepository } from "./userRepository";
import { ObjectId } from "mongodb";
const fakeId = new ObjectId();
describe("User Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: UserRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeUserEntity);
    repository.getOne.mockResolvedValue(fakeUserEntity);
    repository.update.mockResolvedValue(fakeUserEntity);
    repository.increment.mockResolvedValue(fakeUserEntity);
    repository.getPaginate.mockResolvedValue(fakeUserPaginated?.users);
    repository.getCount.mockResolvedValue(fakeUserPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new UserRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addUser with correct values", async () => {
    await testInstance.addUser(fakeUserEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeUserEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new user created when addUser insert it", async () => {
    const result = await testInstance.addUser(fakeUserEntity);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when addUser returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addUser(fakeUserEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addUser throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addUser(fakeUserEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateUser throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateUser(fakeQuery, fakeUserEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateUser with correct values", async () => {
    await testInstance.updateUser(fakeQuery, fakeUserEntity);
    expect(repository.update).toHaveBeenCalledWith(fakeQuery?.fields, fakeUserEntity);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a user updated when updateUser update it", async () => {
    const result = await testInstance.updateUser(fakeQuery, fakeUserEntity);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return a user updated when updateUser update it when i pass null", async () => {
    const result = await testInstance.updateUser(null as any, fakeUserEntity);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when updateUser returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateUser(fakeQuery, fakeUserEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateUser throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateUser(fakeQuery, fakeUserEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteUser with correct values", async () => {
    await testInstance.deleteUser(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new user created when deleteUser insert it", async () => {
    const result = await testInstance.deleteUser(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteUser returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteUser(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteUser throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteUser(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadUser with correct values", async () => {
    await testInstance.loadUser(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a user when loadUser loaded it", async () => {
    const result = await testInstance.loadUser(fakeQuery);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when loadUser returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadUser(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadUser returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadUser(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadUser throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadUser(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadUserByPage with correct values", async () => {
    await testInstance.loadUserByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadUserByPage with correct values", async () => {
    await testInstance.loadUserByPage(fakeQuery);
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      fakeQuery?.fields,
      {
        createdAt: -1,
      },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
  });
  test("should return a userByPage when loadUserByPage loaded it", async () => {
    const result = await testInstance.loadUserByPage(fakeQuery);
    expect(result).toEqual(fakeUserPaginated);
  });
  test("should return null when loadUserByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadUserByPage(fakeQuery);
    expect(result).toEqual({ users: null, total: 0 });
  });
  test("should return null when loadUserByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadUserByPage(null as any);
    expect(result).toEqual({ users: null, total: 0 });
  });
  test("should rethrow if load of loadUserByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadUserByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if increment of incrementUser throws", async () => {
    repository.increment.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.incrementAppointmentsTotal(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call increment of incrementAppointmentsTotal with correct values", async () => {
    await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(repository.increment).toHaveBeenCalledWith(fakeQuery?.fields, {
      appointmentsTotal: 1,
    });
    expect(repository.increment).toHaveBeenCalledTimes(1);
  });
  test("should return a user incrementd when incrementAppointmentsTotal increment it", async () => {
    const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return a user incrementd when incrementAppointmentsTotal increment it when i pass null", async () => {
    const result = await testInstance.incrementAppointmentsTotal(null as any);
    expect(result).toEqual(fakeUserEntity);
  });
  test("should return null when incrementAppointmentsTotal returns null", async () => {
    repository.increment.mockResolvedValueOnce(null);
    const result = await testInstance.incrementAppointmentsTotal(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if increment of incrementAppointmentsTotal throws", async () => {
    repository.increment.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.incrementAppointmentsTotal(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should return null if i dont pass the userLoggedId", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      fields: { text: "fake_text" },
    });
    expect(user).toBeNull();
  });
  test("should call getPaginate of loadUserByPageGeoNear with text filter with correct values", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
      fields: { text: "fake_text" },
    });
    expect(repository.getPaginate).toHaveBeenCalledWith(
      0,
      {
        $text: {
          $caseSensitive: false,
          $diacriticSensitive: false,
          $search: "fake_text",
        },
        _id: {
          $ne: new ObjectId(fakeId),
        },
        active: true,
      },
      { createdAt: -1 },
      10,
      {}
    );
    expect(repository.getPaginate).toHaveBeenCalledTimes(1);
    expect(user).toEqual(fakeUserPaginated);
  });
  test("should return empty array if was not created anything after call with text filter of loadUserByGeoNear", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
      fields: { text: "fake_text" },
    });
    expect(user).toEqual({ users: [], total: 0 });
  });
  test("getCount default null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(null);
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
      fields: { text: "fake_text" },
    });
    expect(user).toEqual({ users: [], total: 0 });
  });
  test("should rethrow if method of loadUserByGeoNear throws", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    await expect(
      testInstance.loadUserByPageGeoNear({
        ...fakeQuery,
        options: { userLoggedId: fakeId.toString() },
        fields: { text: "fake_text" },
      })
    ).rejects.toThrow("Error");
  });
  test("should call aggregate of loadUserByPageGeoNear with query default with correct values", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    repository.aggregate
      .mockResolvedValueOnce(fakeUserPaginated.users)
      .mockResolvedValueOnce([{ name: fakeUserPaginated.total }]);
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
    });
    expect(repository.aggregate).toHaveBeenCalledWith([
      {
        $geoNear: {
          distanceField: "distance",
          maxDistance: 20000000,
          near: { coordinates: [43.6589, -69.094], type: "Point" },
          query: {
            _id: { $ne: new ObjectId(fakeId) },
            active: true,
            name: "123",
          },
          spherical: true,
        },
      },
      { $sort: { distance: 1 } },
      { $skip: -10 },
      { $limit: 10 },
      { $project: { password: 0 } },
    ]);
  });
  test("should return null when coord is null", async () => {
    repository.getOne.mockResolvedValueOnce(null as any);
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      fields: null,
      options: { userLoggedId: fakeId.toString() },
    });
    expect(user).toBeNull();
  });
  test("should rethrow if aggregate of loadUserByPageGeoNear with query default throws", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    repository.aggregate.mockRejectedValueOnce(new Error("any_error"));
    const user = testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
    });
    await expect(user).rejects.toThrow("any_error");
  });
  test("should return null in loadUserByPageGeoNear if i pass null as parameter", async () => {
    const user = await testInstance.loadUserByPageGeoNear(null as any);
    expect(user).toBeNull();
  });
  test("should rethrow in second call if aggregate of loadUserByPageGeoNear with query default throws", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    repository.aggregate
      .mockResolvedValueOnce(fakeUserPaginated.users)
      .mockRejectedValueOnce(new Error("any_error"));
    const user = testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
    });
    await expect(user).rejects.toThrow("any_error");
  });
  test("should return empty array in loadUserByPageGeoNear with query default with correct values", async () => {
    repository.getOne.mockResolvedValueOnce({
      ...fakeUserEntity,
      coord: { coordinates: [43.6589, -69.094] },
    });
    repository.aggregate
      .mockResolvedValueOnce(null as any)
      .mockResolvedValueOnce(null as any);
    const user = await testInstance.loadUserByPageGeoNear({
      ...fakeQuery,
      options: { userLoggedId: fakeId.toString() },
    });
    expect(repository.aggregate).toHaveBeenCalledWith([
      {
        $geoNear: {
          distanceField: "distance",
          maxDistance: 20000000,
          near: { coordinates: [43.6589, -69.094], type: "Point" },
          query: {
            _id: { $ne: new ObjectId(fakeId) },
            active: true,
            name: "123",
          },
          spherical: true,
        },
      },
      { $sort: { distance: 1 } },
      { $skip: -10 },
      { $limit: 10 },
      { $project: { password: 0 } },
    ]);
    expect(repository.aggregate).toHaveBeenCalledWith([
      {
        $geoNear: {
          distanceField: "distance",
          maxDistance: 20000000,
          near: { coordinates: [43.6589, -69.094], type: "Point" },
          query: {
            _id: { $ne: new ObjectId(fakeId) },
            active: true,
            name: "123",
          },
          spherical: true,
        },
      },
      { $count: "name" },
    ]);
    expect(repository.aggregate).toHaveBeenCalledTimes(2);
    expect(user).toEqual({ users: [], total: 0 });
  });
});
