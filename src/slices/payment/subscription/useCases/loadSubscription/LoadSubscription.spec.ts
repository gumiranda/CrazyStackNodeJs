import { LoadSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { LoadSubscription, loadSubscription } from "./LoadSubscription";

describe("LoadSubscription", () => {
  let fakeQuery: Query;
  let testInstance: LoadSubscription;
  let loadSubscriptionRepository: MockProxy<LoadSubscriptionRepository>;
  let fakePaymentProvider: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadSubscriptionRepository = mock();
    fakePaymentProvider = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadSubscriptionRepository.loadSubscription.mockResolvedValue(fakeSubscriptionEntity);
  });
  beforeEach(() => {
    testInstance = loadSubscription(loadSubscriptionRepository, fakePaymentProvider);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadSubscription of LoadSubscriptionRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadSubscriptionRepository.loadSubscription).toHaveBeenCalledWith(fakeQuery);
    expect(loadSubscriptionRepository.loadSubscription).toHaveBeenCalledTimes(1);
  });
  it("should return a subscription loaded when loadSubscriptionRepository insert it", async () => {
    const subscription = await testInstance(fakeQuery);
    expect(subscription).toEqual(fakeSubscriptionEntity);
  });
  it("should return null a new subscription loaded when loadSubscriptionRepository return it", async () => {
    loadSubscriptionRepository.loadSubscription.mockResolvedValue(null);
    const subscription = await testInstance(fakeQuery);
    expect(subscription).toBeNull();
  });
  it("should rethrow if loadSubscription of LoadSubscriptionRepository throws", async () => {
    loadSubscriptionRepository.loadSubscription.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
