import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddSubscriptionController } from "./addSubscriptionController";
import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddSubscriptionController", () => {
  let testInstance: AddSubscriptionController;
  let addSubscription: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addSubscription = jest.fn();
    addSubscription.mockResolvedValue({
      ...fakeSubscriptionEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddSubscriptionController(validation, addSubscription);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeSubscriptionEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeSubscriptionEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addSubscription with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeSubscriptionEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeSubscriptionEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addSubscription).toHaveBeenCalledWith({
      ...fakeSubscriptionEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addSubscription).toHaveBeenCalledTimes(1);
  });
  test("should throws if addSubscription throw", async () => {
    addSubscription.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeSubscriptionEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeSubscriptionEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
