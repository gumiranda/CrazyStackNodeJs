import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddTrendController } from "./addTrendController";
import { fakeTrendEntity } from "@/slices/social-network/trend/entities/TrendEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddTrendController", () => {
  let testInstance: AddTrendController;
  let addTrend: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addTrend = jest.fn();
    addTrend.mockResolvedValue({
      ...fakeTrendEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddTrendController(validation, addTrend);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeTrendEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeTrendEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addTrend with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTrendEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTrendEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addTrend).toHaveBeenCalledWith({
      ...fakeTrendEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addTrend).toHaveBeenCalledTimes(1);
  });
  test("should throws if addTrend throw", async () => {
    addTrend.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTrendEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeTrendEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
