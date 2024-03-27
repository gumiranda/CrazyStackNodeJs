import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateSubscriptionController } from "./updateSubscriptionController";
import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateSubscriptionController", () => {
  let testInstance: UpdateSubscriptionController;
  let updateSubscription: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateSubscription = jest.fn();
    updateSubscription.mockResolvedValue({
      ...fakeSubscriptionEntity,
      createdById: fakeUserEntity?._id,
    });
    validationQuery = mock();
    validationQuery.validate.mockResolvedValue([] as never);
    validationBody = mock();
    validationBody.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new UpdateSubscriptionController(
      validationQuery,
      validationBody,
      updateSubscription
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeSubscriptionEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeSubscriptionEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeSubscriptionEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeSubscriptionEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateSubscription with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeSubscriptionEntity,
      query: fakeSubscriptionEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeSubscriptionEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateSubscription).toHaveBeenCalledWith(
      {
        fields: {
          ...fakeSubscriptionEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeSubscriptionEntity
    );
    expect(updateSubscription).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateSubscription throw", async () => {
    updateSubscription.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeSubscriptionEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeSubscriptionEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeSubscriptionEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
