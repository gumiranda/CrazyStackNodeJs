import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { DeleteSubscriptionController } from "./deleteSubscriptionController";
import { fakeSubscriptionEntity } from "@/slices/payment/subscription/entities/SubscriptionEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("DeleteSubscriptionController", () => {
  let testInstance: DeleteSubscriptionController;
  let deleteSubscription: jest.Mock;
  let validation: MockProxy<Validation>;
  let fakeQuery: any;
  beforeAll(async () => {
    MockDate.set(new Date());
    deleteSubscription = jest.fn();
    deleteSubscription.mockResolvedValue(true);
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    fakeQuery = { _id: fakeSubscriptionEntity._id };
    testInstance = new DeleteSubscriptionController(validation, deleteSubscription);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ query: fakeQuery });
    expect(validation.validate).toHaveBeenCalledWith(fakeQuery);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call deleteSubscription with correct params", async () => {
    const result = await testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(ok(true));
    expect(deleteSubscription).toHaveBeenCalledWith({
      fields: { ...fakeQuery, createdById: fakeUserEntity?._id },
      options: {},
    });
    expect(deleteSubscription).toHaveBeenCalledTimes(1);
  });
  test("should throws if deleteSubscription throw", async () => {
    deleteSubscription.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      query: fakeQuery,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("_id")]);
    const httpResponse = await testInstance.execute({ query: fakeQuery });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("_id")]));
  });
});
