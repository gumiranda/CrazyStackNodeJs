import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { SubscriptionEntity } from "@/slices/payment/subscription/entities";
import { AddSubscriptionRepository } from "@/slices/payment/subscription/repositories/contracts";
import MockDate from "mockdate";

import { mock, MockProxy } from "jest-mock-extended";
import { addSubscription } from "./AddSubscription";

describe("addSubscription", () => {
  let testInstance: any;
  let paymentProvider: any;
  let addSubscriptionRepository: MockProxy<AddSubscriptionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addSubscriptionRepository = mock();
    paymentProvider = mock();
    addSubscriptionRepository.addSubscription.mockResolvedValue(fakeSubscriptionEntity);
  });
  beforeEach(() => {
    testInstance = addSubscription(addSubscriptionRepository, paymentProvider);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call addSubscription of AddSubscriptionRepository with correct values", async () => {
    await testInstance(fakeSubscriptionEntity);
    expect(addSubscriptionRepository.addSubscription).toHaveBeenCalledWith(
      new SubscriptionEntity(fakeSubscriptionEntity)
    );
    expect(addSubscriptionRepository.addSubscription).toHaveBeenCalledTimes(1);
  });
  it("should return a new subscription created when addSubscriptionRepository insert it", async () => {
    const subscription = await testInstance(fakeSubscriptionEntity);
    expect(subscription).toEqual(fakeSubscriptionEntity);
  });
  it("should return null a new subscription created when addSubscriptionRepository insert it", async () => {
    addSubscriptionRepository.addSubscription.mockResolvedValue(null);
    const subscription = await testInstance(fakeSubscriptionEntity);
    expect(subscription).toBeNull();
  });
  it("should rethrow if addSubscription of AddSubscriptionRepository throws", async () => {
    addSubscriptionRepository.addSubscription.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeSubscriptionEntity)).rejects.toThrowError("any_error");
  });
});
