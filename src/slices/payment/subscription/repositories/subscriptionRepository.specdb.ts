import {
  fakeSubscriptionEntity,
  fakeSubscriptionPaginated,
} from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { SubscriptionRepository } from "./subscriptionRepository";

describe("Subscription Mongo Repository", () => {
  let fakeQuery: Query;
  let testInstance: SubscriptionRepository;
  let repository: MockProxy<Repository>;
  beforeAll(async () => {
    fakeQuery = { fields: { name: "123" }, options: {} };
    MockDate.set(new Date());
    repository = mock<Repository>();
    repository.add.mockResolvedValue(fakeSubscriptionEntity);
    repository.getOne.mockResolvedValue(fakeSubscriptionEntity);
    repository.update.mockResolvedValue(fakeSubscriptionEntity);
    repository.getPaginate.mockResolvedValue(fakeSubscriptionPaginated?.subscriptions);
    repository.getCount.mockResolvedValue(fakeSubscriptionPaginated?.total);
    repository.deleteOne.mockResolvedValue(true);
  });
  beforeEach(async () => {
    testInstance = new SubscriptionRepository(repository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  test("should call add of addSubscription with correct values", async () => {
    await testInstance.addSubscription(fakeSubscriptionEntity);
    expect(repository.add).toHaveBeenCalledWith(fakeSubscriptionEntity);
    expect(repository.add).toHaveBeenCalledTimes(1);
  });
  test("should return a new subscription created when addSubscription insert it", async () => {
    const result = await testInstance.addSubscription(fakeSubscriptionEntity);
    expect(result).toEqual(fakeSubscriptionEntity);
  });
  test("should return null when addSubscription returns null", async () => {
    repository.add.mockResolvedValueOnce(null);
    const result = await testInstance.addSubscription(fakeSubscriptionEntity);
    expect(result).toBeNull();
  });
  test("should rethrow if add of addSubscription throws", async () => {
    repository.add.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.addSubscription(fakeSubscriptionEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should rethrow if update of updateSubscription throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateSubscription(fakeQuery, fakeSubscriptionEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call update of updateSubscription with correct values", async () => {
    await testInstance.updateSubscription(fakeQuery, fakeSubscriptionEntity);
    expect(repository.update).toHaveBeenCalledWith(
      fakeQuery?.fields,
      fakeSubscriptionEntity
    );
    expect(repository.update).toHaveBeenCalledTimes(1);
  });
  test("should return a subscription updated when updateSubscription update it", async () => {
    const result = await testInstance.updateSubscription(
      fakeQuery,
      fakeSubscriptionEntity
    );
    expect(result).toEqual(fakeSubscriptionEntity);
  });
  test("should return a subscription updated when updateSubscription update it when i pass null", async () => {
    const result = await testInstance.updateSubscription(
      null as any,
      fakeSubscriptionEntity
    );
    expect(result).toEqual(fakeSubscriptionEntity);
  });
  test("should return null when updateSubscription returns null", async () => {
    repository.update.mockResolvedValueOnce(null);
    const result = await testInstance.updateSubscription(
      fakeQuery,
      fakeSubscriptionEntity
    );
    expect(result).toBeNull();
  });
  test("should rethrow if update of updateSubscription throws", async () => {
    repository.update.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.updateSubscription(fakeQuery, fakeSubscriptionEntity);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call delete of deleteSubscription with correct values", async () => {
    await testInstance.deleteSubscription(fakeQuery);
    expect(repository.deleteOne).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.deleteOne).toHaveBeenCalledTimes(1);
  });
  test("should return a new subscription created when deleteSubscription insert it", async () => {
    const result = await testInstance.deleteSubscription(fakeQuery);
    expect(result).toEqual(true);
  });
  test("should return null when deleteSubscription returns null", async () => {
    repository.deleteOne.mockResolvedValueOnce(null);
    const result = await testInstance.deleteSubscription(fakeQuery);
    expect(result).toBeNull();
  });
  test("should rethrow if delete of deleteSubscription throws", async () => {
    repository.deleteOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.deleteSubscription(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call load of loadSubscription with correct values", async () => {
    await testInstance.loadSubscription(fakeQuery);
    expect(repository.getOne).toHaveBeenCalledWith(fakeQuery?.fields, fakeQuery?.options);
    expect(repository.getOne).toHaveBeenCalledTimes(1);
  });
  test("should return a subscription when loadSubscription loaded it", async () => {
    const result = await testInstance.loadSubscription(fakeQuery);
    expect(result).toEqual(fakeSubscriptionEntity);
  });
  test("should return null when loadSubscription returns null", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadSubscription(fakeQuery);
    expect(result).toBeNull();
  });
  test("should return null when loadSubscription returns null passing null as parameter", async () => {
    repository.getOne.mockResolvedValueOnce(null);
    const result = await testInstance.loadSubscription(null as any);
    expect(result).toBeNull();
  });
  test("should rethrow if load of loadSubscription throws", async () => {
    repository.getOne.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadSubscription(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
  test("should call getCount of loadSubscriptionByPage with correct values", async () => {
    await testInstance.loadSubscriptionByPage(fakeQuery);
    expect(repository.getCount).toHaveBeenCalledWith(fakeQuery?.fields);
    expect(repository.getCount).toHaveBeenCalledTimes(1);
  });
  test("should call getPaginate of loadSubscriptionByPage with correct values", async () => {
    await testInstance.loadSubscriptionByPage(fakeQuery);
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
  test("should return a subscriptionByPage when loadSubscriptionByPage loaded it", async () => {
    const result = await testInstance.loadSubscriptionByPage(fakeQuery);
    expect(result).toEqual(fakeSubscriptionPaginated);
  });
  test("should return null when loadSubscriptionByPage returns null", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadSubscriptionByPage(fakeQuery);
    expect(result).toEqual({ subscriptions: null, total: 0 });
  });
  test("should return null when loadSubscriptionByPage returns null passing null as parameter", async () => {
    repository.getPaginate.mockResolvedValueOnce(null);
    repository.getCount.mockResolvedValueOnce(0);
    const result = await testInstance.loadSubscriptionByPage(null as any);
    expect(result).toEqual({ subscriptions: null, total: 0 });
  });
  test("should rethrow if load of loadSubscriptionByPage throws", async () => {
    repository.getPaginate.mockRejectedValueOnce(new Error("Error"));
    const result = testInstance.loadSubscriptionByPage(fakeQuery);
    await expect(result).rejects.toThrow("Error");
  });
});
