import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { SubscriptionEntity } from "@/slices/payment/subscription/entities";
import { DeleteSubscriptionRepository } from "@/slices/payment/subscription/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { deleteSubscription } from "./DeleteSubscription";
import { Query } from "@/application/types";

describe("deleteSubscription", () => {
  let testInstance: any;
  let fakeQuery: Query;
  let deleteSubscriptionRepository: MockProxy<DeleteSubscriptionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteSubscriptionRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    deleteSubscriptionRepository.deleteSubscription.mockResolvedValue(
      fakeSubscriptionEntity
    );
  });
  beforeEach(() => {
    testInstance = deleteSubscription(deleteSubscriptionRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call deleteSubscription of DeleteSubscriptionRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(deleteSubscriptionRepository.deleteSubscription).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(deleteSubscriptionRepository.deleteSubscription).toHaveBeenCalledTimes(1);
  });
  it("should return a new subscription deleted when deleteSubscriptionRepository delete it", async () => {
    const subscription = await testInstance(fakeQuery);
    expect(subscription).toEqual(fakeSubscriptionEntity);
  });
  it("should return null a new subscription deleted when deleteSubscriptionRepository delete it", async () => {
    deleteSubscriptionRepository.deleteSubscription.mockResolvedValue(null);
    const subscription = await testInstance(fakeSubscriptionEntity);
    expect(subscription).toBeNull();
  });
  it("should rethrow if deleteSubscription of DeleteSubscriptionRepository throws", async () => {
    deleteSubscriptionRepository.deleteSubscription.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
