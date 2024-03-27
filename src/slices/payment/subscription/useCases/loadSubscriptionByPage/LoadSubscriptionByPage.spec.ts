import { LoadSubscriptionByPageRepository } from "@/slices/payment/subscription/repositories";
import MockDate from "mockdate";
import { mock, MockProxy } from "jest-mock-extended";
import { Query } from "@/application/types";
import { fakeSubscriptionPaginated } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { LoadSubscriptionByPage, loadSubscriptionByPage } from "./LoadSubscriptionByPage";

describe("LoadSubscriptionByPage", () => {
  let fakeQuery: Query;
  let testInstance: LoadSubscriptionByPage;
  let loadSubscriptionByPageRepository: MockProxy<LoadSubscriptionByPageRepository>;
  beforeAll(async () => {
    MockDate.set(new Date());
    loadSubscriptionByPageRepository = mock();
    fakeQuery = { fields: { name: "123" }, options: {} };
    loadSubscriptionByPageRepository.loadSubscriptionByPage.mockResolvedValue(
      fakeSubscriptionPaginated
    );
  });
  beforeEach(() => {
    testInstance = loadSubscriptionByPage(loadSubscriptionByPageRepository);
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("should call loadSubscriptionByPage of LoadSubscriptionByPageRepository with correct values", async () => {
    await testInstance(fakeQuery);
    expect(loadSubscriptionByPageRepository.loadSubscriptionByPage).toHaveBeenCalledWith(
      fakeQuery
    );
    expect(loadSubscriptionByPageRepository.loadSubscriptionByPage).toHaveBeenCalledTimes(
      1
    );
  });
  it("should return a subscription loaded when loadSubscriptionByPageRepository insert it", async () => {
    const subscription = await testInstance(fakeQuery);
    expect(subscription).toEqual(fakeSubscriptionPaginated);
  });
  it("should return null a new subscription loaded when loadSubscriptionByPageRepository return it", async () => {
    loadSubscriptionByPageRepository.loadSubscriptionByPage.mockResolvedValue(null);
    const subscription = await testInstance(fakeQuery);
    expect(subscription).toBeNull();
  });
  it("should rethrow if loadSubscriptionByPage of LoadSubscriptionByPageRepository throws", async () => {
    loadSubscriptionByPageRepository.loadSubscriptionByPage.mockRejectedValueOnce(
      new Error("any_error")
    );
    await expect(testInstance(fakeQuery)).rejects.toThrowError("any_error");
  });
});
