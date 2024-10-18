import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { UpdateTrendController } from "./updateTrendController";
import { fakeTrendEntity } from "@/slices/trend/entities/TrendEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("UpdateTrendController", () => {
  let testInstance: UpdateTrendController;
  let updateTrend: jest.Mock;
  let validationQuery: MockProxy<Validation>;
  let validationBody: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    updateTrend = jest.fn();
    updateTrend.mockResolvedValue({
      ...fakeTrendEntity,
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
    testInstance = new UpdateTrendController(
      validationQuery,
      validationBody,
      updateTrend
    );
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validationQuery with correct params", async () => {
    await testInstance.execute({ query: fakeTrendEntity });
    expect(validationQuery.validate).toHaveBeenCalledWith(fakeTrendEntity);
    expect(validationQuery.validate).toHaveBeenCalledTimes(1);
  });
  test("should call validationBody with correct params", async () => {
    await testInstance.execute({ body: fakeTrendEntity });
    expect(validationBody.validate).toHaveBeenCalledWith(fakeTrendEntity);
    expect(validationBody.validate).toHaveBeenCalledTimes(1);
  });
  test("should call updateTrend with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeTrendEntity,
      query: fakeTrendEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeTrendEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(updateTrend).toHaveBeenCalledWith(
       {
        fields: {
         ...fakeTrendEntity,
          createdById: fakeUserEntity?._id,
        },
        options: {},
      },
      fakeTrendEntity
    );
    expect(updateTrend).toHaveBeenCalledTimes(1);
  });
  test("should throws if updateTrend throw", async () => {
    updateTrend.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeTrendEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field in body", async () => {
    validationBody.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeTrendEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
  test("should return bad request if i dont pass any required field in query", async () => {
    validationQuery.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ query: fakeTrendEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
