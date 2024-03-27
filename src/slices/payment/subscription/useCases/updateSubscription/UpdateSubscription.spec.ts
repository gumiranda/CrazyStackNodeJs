import { UpdateSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { UpdateSubscription, updateSubscription } from "./UpdateSubscription";

describe("UpdateSubscription", () => {
  let fakeQuery: Query;
  let testInstance: UpdateSubscription;
  let updateSubscriptionRepository: MockProxy<UpdateSubscriptionRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateSubscriptionRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    updateSubscriptionRepository.updateSubscription.mockResolvedValue(
      fakeSubscriptionEntity
    );
  });
  beforeEach(() => {
    testInstance = updateSubscription(updateSubscriptionRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call updateSubscription of UpdateSubscriptionRepository with correct values", async () => {
    await testInstance(fakeQuery, fakeSubscriptionEntity);
    expect(updateSubscriptionRepository.updateSubscription).toHaveBeenCalledWith(
      fakeQuery,
      fakeSubscriptionEntity
    );
    expect(updateSubscriptionRepository.updateSubscription).toHaveBeenCalledTimes(1);
  });
  it("should return a subscription updateed when updateSubscriptionRepository insert it", async () => {
    const subscription = await testInstance(fakeQuery, fakeSubscriptionEntity);
    expect(subscription).toEqual(fakeSubscriptionEntity);
  });
  it("should return null a new subscription updateed when updateSubscriptionRepository return it", async () => {
    updateSubscriptionRepository.updateSubscription.mockResolvedValue(null);
    const subscription = await testInstance(fakeQuery, fakeSubscriptionEntity);
    expect(subscription).toBeNull();
  });
  it("should rethrow if updateSubscription of UpdateSubscriptionRepository throws", async () => {
    updateSubscriptionRepository.updateSubscription.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery, fakeSubscriptionEntity)).rejects.toThrowError(
      "any_error"
    );
  });
});
